const { TOKEN_EXPIRED_TIME,
  REFRESH_TOKEN_EXPIRED_TIME } = require('./../globalData/constants') //90 days
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { jwtKey } = require('./../env')

const generateToken = async (user) => {
  const {
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
    isActive,
    ...selectedInfo
  } = user
  const token = await jwt.sign(selectedInfo, jwtKey, { expiresIn: TOKEN_EXPIRED_TIME })
  return token
}

const login = (userService, clientService) => async (dataReq) => {
  try {
    const user = await userService.getByUserName(dataReq.userName, true)
    if (!user) return {
      message: 'invalid user name!'
    }
    const {
      password,
      ...userView
    } = user
    const isValidPass = await bcrypt.compare(dataReq.password, password)
    if (isValidPass) {
      const token = await generateToken(user)
      const refreshToken = await clientService.generateRefreshToken(user, dataReq.userAgent, REFRESH_TOKEN_EXPIRED_TIME)
      return { user: userView, token, refreshToken }
    } else return {
      message: 'invalid password!'
    }
  } catch (error) {
    throw error
  }
}

const register = (userService, clientService) => async (dataReq) => {
  try {
    const checkExistUser = await userService.getByUserName(dataReq.userName || '')
    let user
    if (checkExistUser) {
      let userUpdated = await userService.update(dataReq, {
        where: {
          id: checkExistUser.id
        },
        returning: true
      })
      let [ rowsUpdate, [updatedUser] ] = userUpdated
      user = updatedUser.dataValues
    } else {
      user = await userService.create(dataReq) || null
    }
    if (!user) return {
      message: 'invalid user data!'
    }
    const tokenData = {
      userName: user.username,
      id: user.id,
      lastLogin: user.lastLoginTime,
      googleId: user.googleId
    }
    const token = await generateToken(tokenData)
    const refreshToken = await clientService.generateRefreshToken(tokenData, dataReq.userAgent, REFRESH_TOKEN_EXPIRED_TIME)
    return { tokenData, token, refreshToken }
  } catch (error) {
    throw error
  }
}

const getAuthDataByToken = (userService, clientService) => async (token, refreshToken, userAgent) => {
  try {
    const decodedToken = await jwt.verify(token, jwtKey)
    const user = await userService.getByUserName(decodedToken.username)
    return { user, token, refreshToken }
  } catch (decodedError) {
    if (decodedError.name === 'TokenExpiredError') {
      try {
        const decodedRefreshToken = await jwt.verify(refreshToken, jwtKey)
        const clientInfos = await clientService.getUserAgentByUserId(decodedRefreshToken.userId) || []
        if (clientInfos.includes(userAgent)) {
          const user = await userService.getByUserId(decodedRefreshToken.userId)
          const newToken = await generateToken(userData)
          return { user, token: newToken, refreshToken }
        } else {
          throw ({
            code: 403,
            message: 'This device was not saved. Relogin please.'
          })
        }
      } catch (error) {
        throw error
      }
    } else {
      throw (decodedError)
    }
  }
}

// to apply dependency injection
const authService = (userService, clientService) => ({
  login: login(userService, clientService),
  register: register(userService, clientService),
  getAuthDataByToken: getAuthDataByToken(userService, clientService),
})

module.exports = authService