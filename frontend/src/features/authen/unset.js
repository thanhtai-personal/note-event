import StoreSingleton from 'root/store/instant'
import authenReducer from './reducers/authen.reducer'
import authenSagas from './sagas'
import { FEATURE_AUTH } from 'root/actions/types'

const unsetFeature = () => {
  const store = StoreSingleton.getInstance().store
  let mapObject = store.sagasManager.getSagasMap()
  if (!Object.keys(mapObject).includes(FEATURE_AUTH)) {
    store.reducerManager.remove(FEATURE_AUTH, authenReducer)
    store.sagasManager.remove(FEATURE_AUTH, authenSagas)
    store.updateReducer()
    store.updateSagas()
}
  console.log('++++++++++++END UNSET AUTHENTICATION+++++++++++++', store?.getState())
}

export default unsetFeature