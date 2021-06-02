import StoreSingleton from 'root/store/instant'
import portfolioReducer from './reducers/portfolio.reducer'
import portfolioSagas from './sagas'
import { FEATURE_PORTFOLIO } from 'root/actions/types'

const setupFeature = () => {
  const store = StoreSingleton.getInstance().store
  let mapObject = store.sagasManager.getSagasMap()
  if (!Object.keys(mapObject).includes(FEATURE_PORTFOLIO)) {
    store.reducerManager.add(FEATURE_PORTFOLIO, portfolioReducer)
    store.sagasManager.add(FEATURE_PORTFOLIO, portfolioSagas)
    store.updateReducer()
    store.updateSagas()
}
  console.log('++++++++++++END SETUP FEATURE_PORTFOLIO+++++++++++++', store?.getState())
}

export default setupFeature