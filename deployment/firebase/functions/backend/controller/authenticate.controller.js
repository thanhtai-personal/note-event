const { routeType } = require('./../constants')
const AuthService = require('../applicationService/authenticate.service')
const userService = require('../domainService/user.service')
const roleService = require('../domainService/role.service')
const clientService = require('../domainService/client.service')
const googleAccountService = require('../domainService/googleAccount.service')
const {
  LOGIN, REGISTER
} = require('./routePaths')

const authService = AuthService(userService, clientService, googleAccountService, roleService)

const login = async (req, res) => {
  try {
      let authData = null
      if (req.headers.token) {
        authData = await authService.getAuthDataByToken(req.headers.token, req.headers.refreshtoken, req.headers['user-agent'])
        await authService.updateLastLogin(authData)
      } else {
        const dataReq = {
          ...req.body,
          username: req.body.username || req.body.email,
          userAgent: req.headers['user-agent'],
          lastLoginTime: new Date()
        }
        if (dataReq.username && dataReq.token && !dataReq.password) {
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