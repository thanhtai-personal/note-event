import { routeType } from '../../../constants'
import authService from '../services'
import { appRoutePaths } from './../../constants'

const routes = [
  {
    type: routeType.GET,
    path: appRoutePaths.getGoogleAuth,
    serviceFunc: authService.getAuth
  }
]

export default routes
