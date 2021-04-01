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
        authData = await authService.getAuthDataByToken(req.headers.token, req.headers.refreshtoken, req.headers['user-agent'])
      } else {
        const dataReq = {
          ...req.body,
          userName: req.body.userName || req.body.email,
          userAgent: req.headers['user-agent']
        }
        if (dataReq.userName && dataReq.token && !dataReq.password) {
          authData = await authService.register(dataReq)
        } else {
          authData = await authService.login(dataReq)
        }
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
        userAgent: req.headers['user-agent']
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