import userService from 'modelService/user.service'
import { checkHashPassword, generateToken } from './utils'

const login = async (dataReq) => {
  try {
      const user = userService.getByEmail(dataReq.email)
      const token = checkHashPassword(dataReq.password, user.password)
      return { user, token }
  } catch (error) {
      throw error
  }
}

const register = async (dataReq) => {
  try {
      const user = userService.create(dataReq)
      const token = generateToken(user.password)
      return { user, token }
  } catch (error) {
      throw error
  }
}

export default {
  login,
  register
}