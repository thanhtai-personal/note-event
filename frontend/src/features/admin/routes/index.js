import DashboardContainer from '../containers/admin'
import setUpFeature from '../setup'
import unsetFeature from '../unset'

const adminRoutes = [
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
    setUpStore: setUpFeature,
    unsetFeature: unsetFeature,
  }
]

export default adminRoutes