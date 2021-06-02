import StoreSingleton from 'root/store/instant'
import portfolioReducer from './reducers/default.reducer'
import portfolioSagas from './sagas'
import { FEATURE_PORTFOLIO_V1 } from 'root/actions/types'

const unsetFeature = () => {
  const store = StoreSingleton.getInstance().store
  let mapObject = store.sagasManager.getSagasMap()
  if (!Object.keys(mapObject).includes(FEATURE_PORTFOLIO_V1)) {
    store.reducerManager.remove(FEATURE_PORTFOLIO_V1, portfolioReducer)
    store.sagasManager.remove(FEATURE_PORTFOLIO_V1, portfolioSagas)
    store.updateReducer()
    store.updateSagas()
}
  console.log('++++++++++++END UNSET PORTFOLIO v1+++++++++++++', store?.getState())
}

export default unsetFeature