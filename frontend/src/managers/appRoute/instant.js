import Utils from 'root/utils'
import createAppRouteManager from './manager'

const getAppRouteInstant = () => {
    const appRouteManagerSingleton = Utils.makeSingleton(createAppRouteManager)
    return appRouteManagerSingleton.getInstance()
}

export default getAppRouteInstant