const { routeType } = require('./../constants')
const AuthService = require('../applicationService/authenticate.service')
const userService = require('../domainService/user.service')
const clientService = require('../domainService/client.service')

const authService = AuthService(userService, clientService)

const login = async (req, res) => {
  try {
      let authData = null
      if (req.header.token) {
        authData = await authService.getAuthDataByToken(req.header.token, req.header.refreshToken)
      } else {
        authData = await authService.login(req.body)
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
      const authData = await authService.register(req.body)
      res.status(200).send(authData)
  } catch (error) {
      res.status(500).send(error)
  }
}

module.exports =  [
  {
    controllerExecution: login,
    path: '/login',
    method: routeType.POST
  },
  {
    controllerExecution: signUp,
    path: '/register',
    method: routeType.POST
  }
]