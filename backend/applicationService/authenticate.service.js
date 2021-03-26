import { checkHashPassword, generateToken } from './utils'

const login = (service) => async (dataReq) => {
  try {
      const user = service.getByEmail(dataReq.email)
      const token = checkHashPassword(dataReq.password, user.password)
      return { user, token }
  } catch (error) {
      throw error
  }
}

const register = (service) => async (dataReq) => {
  try {
      const user = service.create(dataReq)
      const token = generateToken(user.password)
      return { user, token }
  } catch (error) {
      throw error
  }
}

// export default {
//   login,
//   register
// }

// to apply dependency injection
const authService = (service) => ({
  login: login(service),
  register: register(service)
})

export default authService