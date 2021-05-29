import StoreSingleton from 'root/store/instant'
import showRoomReducer from './reducers/showRoom.reducer'
import showRoomSagas from './sagas'
import { FEATURE_SHOW_ROOM, SHOW_ROOM_REDUCER } from 'root/actions/types'

const setupFeature = () => {
  const store = StoreSingleton.getInstance().store
  let mapObject = store.sagasManager.getSagasMap()
  if (!Object.keys(mapObject).includes(FEATURE_SHOW_ROOM)) {
    store.reducerManager.add(SHOW_ROOM_REDUCER, showRoomReducer)
    store.sagasManager.add(FEATURE_SHOW_ROOM, showRoomSagas)
    store.updateReducer()
    store.updateSagas()
  }
  console.log('++++++++++++END SETUP SHOW ROOM+++++++++++++', store.getState())
}

export default setupFeature