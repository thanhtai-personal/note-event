import LoginContainer from '../containers/login'
import RegisterContainer from '../containers/register'
import setUpFeature from '../setup'
import unsetFeature from '../unset'

const defaultRoutes = [
  /**
   * when add setUpFeature property to route, this route will not lazy load store data.
   * Mean is data of route(reducer, api, sagas) in store will be loaded from building time.
   */
  {
    key: 'login',
    path: '/login',
    isExact: true,
    component: LoginContainer,
    hocs: [],
    setUpStore: setUpFeature,
    unsetFeature: unsetFeature,
  },
  {
    key: 'signup',
    path: '/signup',
    isExact: true,
    component: RegisterContainer,
    hocs: [],
    setUpStore: setUpFeature,
    unsetFeature: unsetFeature,
  },
]

export default defaultRoutes