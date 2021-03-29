const { TOKEN_EXPIRED_TIME, 
 REFRESH_TOKEN_EXPIRED_TIME } = require('./../globalData/constants') //90 days
const jwt = require('jsonwebtoken')
const { jwtKey } = require('./../env')

const generateToken = (user) => {
  const {
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
    isActive,
    ...selectedInfo
  } = user
  return jwt.sign(selectedInfo, jwtKey, { expiresIn: TOKEN_EXPIRED_TIME })
}

const login = (userService, clientService) => async (dataReq) => {
  try {
      // const user = userService.getByEmail(dataReq.email)
      // const token = checkHashPassword(dataReq.password, user.password)
      return { user, token }
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
      if (!user) return {}
      const token = generateToken(userData)
      const refreshToken = clientService.generateRefreshToken(user, clientInfo, REFRESH_TOKEN_EXPIRED_TIME)
      return { user, token, refreshToken }
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
  generateToken
})

module.exports =  authService