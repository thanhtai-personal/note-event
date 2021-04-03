import StoreSingleton from 'root/store/instant'
import dashboardReducer from './reducers/dashboard.reducer'
import adminSagas from './sagas'
import { FEATURE_ADMIN } from 'root/actions/types'

const setupFeature = () => {
  const store = StoreSingleton.getInstance().store
  let mapObject = store.reducerManager.getReducerMap()
  if (!Object.keys(mapObject).includes(FEATURE_ADMIN)) {
    store.reducerManager.add(FEATURE_ADMIN, dashboardReducer)
    store.sagasManager.add(FEATURE_ADMIN, adminSagas)
    store.updateReducer()
    store.updateSagas()
  }
  console.log('++++++++++++END SETUP ADMIN+++++++++++++', store.getState())
}

export default setupFeature