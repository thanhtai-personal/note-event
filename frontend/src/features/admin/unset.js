import StoreSingleton from 'root/store/instant'
import dashboardReducer from './reducers/dashboard.reducer'
import adminSagas from './sagas'
import { FEATURE_ADMIN } from 'root/actions/types'

const unsetFeature = () => {
  const store = StoreSingleton.getInstance().store
  let mapObject = store.reducerManager.getReducerMap()
  if (!Object.keys(mapObject).includes(FEATURE_ADMIN)) {
    store.reducerManager.remove(FEATURE_ADMIN, dashboardReducer)
    store.sagasManager.remove(FEATURE_ADMIN, adminSagas)
    store.updateReducer()
    store.updateSagas()
}
  console.log('++++++++++++END UNSET ADMIN+++++++++++++', store.getState())
}

export default unsetFeature