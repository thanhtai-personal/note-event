import HomeContainer from './containers/home'
import setUpFeature from './setup'
import unsetFeature from './unset'

const defaultRoutes = [
  /**
   * when add setUpFeature property to route, this route will not lazy load store data.
   * Mean is data of route(reducer, api, sagas) in store will be loaded from building time.
   */
  {
    key: 'profilev1',
    path: '/portfolio',
    isExact: true,
    component: HomeContainer,
    hocs: [],
    setUpStore: setUpFeature,
    unsetFeature: unsetFeature,
  },
]

export default defaultRoutes