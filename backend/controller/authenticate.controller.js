const { routeType } = require('./../constants')
const AuthService = require('../applicationService/authenticate.service')
const userService = require('../domainService/user.service')

const authService = AuthService(userService)

const login = async (req, res) => {
  try {
      let a = 0
      const { user, token } = await authService.login(req.body)
      res.status(200).send({ user, token })
  } catch (error) {
      res.status(500).send(error)
  }
}

const signUp = async (req, res) => {
  try {
      const { user, token } = await authService.register(req.body)
      res.status(200).send({ user, token })
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