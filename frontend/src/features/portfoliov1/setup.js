import StoreSingleton from 'root/store/instant'
import portfolioReducer from './reducers/default.reducer'
import portfolioSagas from './sagas'
import { FEATURE_PORTFOLIO_V1 } from 'root/actions/types'

const setupFeature = () => {
  const store = StoreSingleton.getInstance().store
  let mapObject = store.sagasManager.getSagasMap()
  if (!Object.keys(mapObject).includes(FEATURE_PORTFOLIO_V1)) {
    store.reducerManager.add(FEATURE_PORTFOLIO_V1, portfolioReducer)
    store.sagasManager.add(FEATURE_PORTFOLIO_V1, portfolioSagas)
    store.updateReducer()
    store.updateSagas()
}
  console.log('++++++++++++END SETUP FEATURE_PORTFOLIO_V1+++++++++++++', store?.getState())
}

export default setupFeature