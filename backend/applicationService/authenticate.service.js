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
      const user = await userService.getByUserName(dataReq.username, true)
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
        return { userView, token, refreshToken }
      } else return {
        message: 'invalid password!'
      }
  } catch (error) {
      throw error
  }
}

const register = (userService, clientService) => async (dataReq) => {
  try {
      let  {
        clientInfo
        , ...userData
      } = dataReq
      const user = await userService.create(userData) || null
      if (!user) return {
        message: 'invalid user data!'
      }
      const token = await generateToken(userData)
      const refreshToken = await clientService.generateRefreshToken(user, clientInfo, REFRESH_TOKEN_EXPIRED_TIME)
      return { user, token, refreshToken }
  } catch (error) {
      throw error
  }
}

const getAuthDataByToken = (userService, clientService) => async (token, refreshToken, userAgent) => {
  try {
    try {
      const decodedToken = await jwt.verify(token, jwtKey)
      const user = await userService.getByUserName(decodedToken.dataValues.username)
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
            throw({
              code: 403,
              message: 'This device was not saved. Relogin please.'
            })
          }
        } catch (error) {
          throw error
        }
      } else {
        throw(decodedError)
      }
    }
  } catch (error) {
      throw error
  }
}

// module.exports =  {
//   login,
//   register
// }

// to apply dependency injection
const authService = (userService, clientService) => ({
  login: login(userService, clientService),
  register: register(userService, clientService),
  getAuthDataByToken: getAuthDataByToken(userService, clientService),
})

module.exports =  authService