import Utils from 'root/utils'
import createReducerManager from './manager'

const getReducerInstant = (history) => {
    const reducerManagerSingleton = Utils.makeSingleton(createReducerManager, history)
    return reducerManagerSingleton.getInstance()
}

export default getReducerInstant