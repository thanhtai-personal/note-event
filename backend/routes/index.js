
const { routeType } = require('./../constants')

const combineAppRoutes = (getApp = () => { }, featureApis = []) => {
  const app = getApp() || {}
  get = (path, serviceFunc) => app.get(path, serviceFunc)
  post = (path, serviceFunc) => app.post(path, serviceFunc)
  put = (path, serviceFunc) => app.put(path, serviceFunc)
  restDelete = (path, serviceFunc) => app.delete(path, serviceFunc)
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

module.exports = combineAppRoutes