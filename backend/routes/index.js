
import { routeType } from './../constants'

const combineAppRoutes = (getApp = () => { }, featureApis = []) => {
  const app = getApp() || {}
  const get = (path, serviceFunc) => app.get(path, serviceFunc)
  const post = (path, serviceFunc) => app.post(path, serviceFunc)
  const put = (path, serviceFunc) => app.put(path, serviceFunc)
  const restDelete = (path, serviceFunc) => app.delete(path, serviceFunc)
  return featureApis.forEach(({method, path, serviceFunc}) => {
    switch (method) {
      case routeType.GET:
        get(path, serviceFunc)
        break;
      case routeType.POST:
        post(path, serviceFunc)
        break;
      case routeType.PUT:
        put(path, serviceFunc)
        break;
      case routeType.DELETE:
        restDelete(path, serviceFunc)
        break;
    }
  })
}

export default combineAppRoutes