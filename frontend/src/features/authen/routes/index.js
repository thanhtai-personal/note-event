import DashboardContainer from '../containers/dashboard'
import setUpFeature from '../setup'

const defaultRoutes = [
  /**
   * when add setUpFeature property to route, this route will not lazy load store data.
   * Mean is data of route(reducer, api, sagas) in store will be loaded from building time.
   */
  {
    key: 'homeAdmin',
    path: '/admin',
    isExact: true,
    component: DashboardContainer,
    hocs: [],
    setUpStore: setUpFeature
  },
  {
    key: 'dashboard',
    path: '/dashboard',
    isExact: true,
    component: DashboardContainer,
    hocs: [],
    setUpStore: setUpFeature
  },
]

export default defaultRoutes