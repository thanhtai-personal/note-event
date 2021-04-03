import StoreSingleton from 'root/store/instant'
import dashboardReducer from './reducers/dashboard.reducer'
import adminSagas from './sagas'
import { FEATURE_ADMIN, DASH_BOARD_REDUCER } from 'root/actions/types'

const setupFeature = () => {
  const store = StoreSingleton.getInstance().store
  let mapObject = store.sagasManager.getSagasMap()
  if (!Object.keys(mapObject).includes(FEATURE_ADMIN)) {
    store.reducerManager.add(DASH_BOARD_REDUCER, dashboardReducer)
    store.sagasManager.add(FEATURE_ADMIN, adminSagas)
    store.updateReducer()
    store.updateSagas()
  }
  console.log('++++++++++++END SETUP ADMIN+++++++++++++', store.getState())
}

export default setupFeature