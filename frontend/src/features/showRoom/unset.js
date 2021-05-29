import StoreSingleton from 'root/store/instant'
import showRoomReducer from './reducers/showRoom.reducer'
import adminSagas from './sagas'
import { FEATURE_SHOW_ROOM, SHOW_ROOM_REDUCER } from 'root/actions/types'

const unsetFeature = () => {
  const store = StoreSingleton.getInstance().store
  let mapObject = store.sagasManager.getSagasMap()
  if (!Object.keys(mapObject).includes(FEATURE_SHOW_ROOM)) {
    store.reducerManager.remove(SHOW_ROOM_REDUCER, showRoomReducer)
    store.sagasManager.remove(FEATURE_SHOW_ROOM, adminSagas)
    store.updateReducer()
    store.updateSagas()
}
  console.log('++++++++++++END UNSET SHOW ROOM+++++++++++++', store.getState())
}

export default unsetFeature