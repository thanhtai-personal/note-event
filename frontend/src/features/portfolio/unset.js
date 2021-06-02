import StoreSingleton from 'root/store/instant'
import portfolioReducer from './reducers/portfolio.reducer'
import portfolioSagas from './sagas'
import { FEATURE_PORTFOLIO } from 'root/actions/types'

const unsetFeature = () => {
  const store = StoreSingleton.getInstance().store
  let mapObject = store.sagasManager.getSagasMap()
  if (!Object.keys(mapObject).includes(FEATURE_PORTFOLIO)) {
    store.reducerManager.remove(FEATURE_PORTFOLIO, portfolioReducer)
    store.sagasManager.remove(FEATURE_PORTFOLIO, portfolioSagas)
    store.updateReducer()
    store.updateSagas()
}
  console.log('++++++++++++END UNSET PORTFOLIO v2+++++++++++++', store?.getState())
}

export default unsetFeature