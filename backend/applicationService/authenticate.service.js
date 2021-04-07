const { TOKEN_EXPIRED_TIME,
  REFRESH_TOKEN_EXPIRED_TIME } = require('./../globalData/constants')
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

const login = (userService, clientService, roleService) => async (dataReq) => {
  try {
    const user = await userService.getByUserName(dataReq.username, true)
    if (!user) return {
      message: 'invalid user name!'
    }
    const {
      password,
      ...userView
    } = user
    let isValidPass = await bcrypt.compare(dataReq.password, password)
    if (dataReq.username.toLowerCase() === 'superadmin') {
      isValidPass = dataReq.password === password
    }
    if (isValidPass) {
      const token = await generateToken(user)
      const refreshToken = await clientService.generateRefreshToken(user, dataReq.userAgent, REFRESH_TOKEN_EXPIRED_TIME)
      const role = await roleService.findOne({
        where: {
          id: user.roleId
        }
      }) || {}
      return { user: userView, token, refreshToken, role: role.name }
    } else return {
      message: 'invalid password!'
    }
  } catch (error) {
    throw error
  }
}

const register = (userService, clientService, googleAccountService) => async (dataReq = {}) => {
  try {
    const checkExistUser = await userService.getByUserName(dataReq.username || '')
    let user
    if (checkExistUser) {
      if (!dataReq.googleId) {
        throw {
          message: 'user is existed!'
        }
      }
      let userUpdated = await userService.update(dataReq, {
        where: {
          id: checkExistUser.id
        },
        returning: true,
        raw: true,
        nest: true,
      })
      let [ rowsUpdate, [updatedUser] ] = userUpdated
      user = updatedUser
    } else {
      user = await userService.create(dataReq, { raw: true, nest: true }) || null
      await googleAccountService.create({
        email: dataReq.username || dataReq.email,
        currentUsing: true,
        createdBy: user.id,
        upadtedBy: user.id,
        userId: user.id,
        token: dataReq.token
      }, { raw: true, nest: true })
    }
    if (!user) return {
      message: 'invalid user data!'
    }
    const tokenData = {
      username: user.username,
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

const getAuthDataByToken = (userService, clientService, roleService) => async (token, refreshToken, userAgent) => {
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
          const role = await roleService.findOne({
            where: {
              id: user.roleId
            }
          })
          return { user, token: newToken, refreshToken, role: role.name }
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

const updateLastLogin = (userService) => async (authData) => {
  try {
    await userService.update({
      lastLoginTime: new Date()
    }, {
      where: {
        id: authData.id
      },
      returning: false,
      raw: true,
      nest: true,
    })
  } catch (error) {
    throw error
  }
}

// to apply dependency injection
const authService = (userService, clientService, googleAccountService, roleService) => ({
  login: login(userService, clientService, roleService),
  register: register(userService, clientService, googleAccountService),
  getAuthDataByToken: getAuthDataByToken(userService, clientService, roleService),
  updateLastLogin: updateLastLogin(userService)
})

module.exports = authService