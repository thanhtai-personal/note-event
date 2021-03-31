const { routeType } = require('./../constants')
const AuthService = require('../applicationService/authenticate.service')
const userService = require('../domainService/user.service')
const clientService = require('../domainService/client.service')
const {
  LOGIN, REGISTER
} = require('./routePaths')

const authService = AuthService(userService, clientService)

const login = async (req, res) => {
  try {
      let authData = null
      if (req.headers.token) {
        authData = await authService.getAuthDataByToken(req.headers.token, req.headers.refreshToken, req.headers.userAgent)
      } else {
        const dataReq = {
          ...req.body,
          userAgent: req.headers.userAgent
        }
        authData = await authService.login(dataReq)
      }
      if (!authData) {
        res.status(500).send({ message: 'get auth data failed!' })
      }
      res.status(200).send(authData)
  } catch (error) {
      res.status(500).send(error)
  }
}

const signUp = async (req, res) => {
  try {
      const reqData = {
        ...req.body,
        userAgent: req.headers.userAgent
      }
      const authData = await authService.register(reqData)
      res.status(200).send(authData)
  } catch (error) {
      res.status(500).send(error)
  }
}

module.exports =  [
  {
    controllerExecution: login,
    path: LOGIN,
    method: routeType.POST
  },
  {
    controllerExecution: signUp,
    path: REGISTER,
    method: routeType.POST
  }
]