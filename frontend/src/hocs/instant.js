import Utils from 'root/utils'
import createHocsManager from './manager'

const getHocsInstant = () => {
    const hocsManagerSingleton = Utils.makeSingleton(createHocsManager)
    return hocsManagerSingleton.getInstance()
}

export default getHocsInstant