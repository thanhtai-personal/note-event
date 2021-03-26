import { routeType } from './../constants'
import authService from '../applicationService/authenticate.service'

const login = async (req, res) => {
  try {
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

export default [
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