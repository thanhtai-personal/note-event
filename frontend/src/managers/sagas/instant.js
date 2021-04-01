import Utils from 'root/utils'
import createSagasManager from './manager'

const getSagaInstant = () => {
    const sagasManagerSingleton = Utils.makeSingleton(createSagasManager)
    return sagasManagerSingleton.getInstance()
}

export default getSagaInstant