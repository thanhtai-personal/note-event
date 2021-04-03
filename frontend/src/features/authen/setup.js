import StoreSingleton from 'root/store/instant'
import authenReducer from './reducers/authen.reducer'
import authenSagas from './sagas'
import { FEATURE_AUTH } from 'root/actions/types'

const setupFeature = () => {
  const store = StoreSingleton.getInstance().store
  let mapObject = store.sagasManager.getSagasMap()
  if (!Object.keys(mapObject).includes(FEATURE_AUTH)) {
    store.reducerManager.add(FEATURE_AUTH, authenReducer)
    store.sagasManager.add(FEATURE_AUTH, authenSagas)
    store.updateReducer()
    store.updateSagas()
}
  console.log('++++++++++++END SETUP AUTHENTICATION+++++++++++++', store?.getState())
}

export default setupFeature