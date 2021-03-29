const { routeType } = require('./../constants')

const combineController = (getApp = () => { }, featureApis = []) => {
  const app = getApp() || {}
  const get = (path, controllerExecution) => app.get(path, controllerExecution)
  const post = (path, controllerExecution) => app.post(path, controllerExecution)
  const put = (path, controllerExecution) => app.put(path, controllerExecution)
  const restDelete = (path, controllerExecution) => app.delete(path, controllerExecution)
  return featureApis.forEach(({ method, path, controllerExecution }) => {
    switch (method) {
      case routeType.GET:
        get(path, controllerExecution)
        break;
      case routeType.POST:
        post(path, controllerExecution)
        break;
      case routeType.PUT:
        put(path, controllerExecution)
        break;
      case routeType.DELETE:
        restDelete(path, controllerExecution)
        break;
    }
  })
}

module.exports =  combineController