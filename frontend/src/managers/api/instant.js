import Utils from 'root/utils'
import createApiManager from './manager'

const apiInstant = () => {
    const apiManagerSingleton = Utils.makeSingleton(createApiManager)
    return apiManagerSingleton.getInstance()
}

export default apiInstant