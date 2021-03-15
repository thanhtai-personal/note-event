const { routeType } = require('./../../constants')
const authService = require('./services')

const routes = [
  {
    type: routeType.GET,
    path: '/auth/google',
    serviceFunc: authService.getAuth
  }
]

module.exports = routes
