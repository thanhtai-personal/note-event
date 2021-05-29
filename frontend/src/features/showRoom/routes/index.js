import ShowRoomContainer from '../containers/showRoom'
import setUpFeature from '../setup'
import unsetFeature from '../unset'

const adminRoutes = [
  /**
   * when add setUpFeature property to route, this route will not lazy load store data.
   * Mean is data of route(reducer, api, sagas) in store will be loaded from building time.
   */
  {
    key: 'showRoom',
    path: '/',
    isExact: true,
    component: ShowRoomContainer,
    hocs: [],
    setUpStore: setUpFeature,
    unsetFeature: unsetFeature,
  },
  {
    key: 'showRoom',
    path: '/products',
    isExact: true,
    component: ShowRoomContainer,
    hocs: [],
    setUpStore: setUpFeature,
    unsetFeature: unsetFeature,
  }
]

export default adminRoutes