import StoreSingleton from 'root/store/instant'
import authenReducer from './reducers/authen.reducer'
import authenSagas from './sagas'


const setupFeature = () => {
  console.log('++++++++++++SETUP AUTHENTICATION+++++++++++++')
  const store = StoreSingleton.getInstance().store
  let mapObject = store.reducerManager.getReducerMap()
  if (!Object.keys(mapObject).includes('authen')) {
    console.info('++++++++++++Add new reducer+++++++++++++')
    store.reducerManager.add('authen', authenReducer)
    store.sagasManager.add('authen', authenSagas)
    store.updateReducer()
    store.updateSagas()
  }
  console.log('++++++++++++END SETUP AUTHENTICATION+++++++++++++')
}

export default setupFeature