const { checkHashPassword, generateToken } = require('./utils')

const login = (userService) => async (dataReq) => {
  try {
      const user = userService.getByEmail(dataReq.email)
      const token = checkHashPassword(dataReq.password, user.password)
      return { user, token }
  } catch (error) {
      throw error
  }
}

const register = (userService) => async (dataReq) => {
  try {
      const user = userService.create(dataReq)
      const token = generateToken(user.password)
      return { user, token }
  } catch (error) {
      throw error
  }
}

// module.exports =  {
//   login,
//   register
// }

// to apply dependency injection
const authService = (userService) => ({
  login: login(userService),
  register: register(userService)
})

module.exports =  authService