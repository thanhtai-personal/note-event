const { routeType } = require('./../constants')

const combineController = (getApp = () => { }, featureApis = []) => {
  const app = getApp() || {}
  const get = (path, controllerExecution) => app.get(path, controllerExecution)
  const post = (path, controllerExecution) => app.post(path, controllerExecution)
  const put = (path, controllerExecution) => app.put(path, controllerExecution)
  const restDelete = (path, controllerExecution) => app.delete(path, controllerExecution)
  console.log('====================APIS===================================')
  return featureApis.forEach(({ method, path, controllerExecution }) => {
    switch (method) {
      case routeType.GET:
        console.log('GET ------ ', path)
        get(path, controllerExecution)
        break;
      case routeType.POST:
        console.log('POST ------ ', path)
        post(path, controllerExecution)
        break;
      case routeType.PUT:
        console.log('PUT ------ ', path)
        put(path, controllerExecution)
        break;
      case routeType.DELETE:
        console.log('DELETE ------ ', path)
        restDelete(path, controllerExecution)
        break;
    }
  })
}

module.exports =  combineController