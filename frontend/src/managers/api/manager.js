
import apiInstant from 'root/api/instant'

function combineApi(apis) {
  const combinedApi = {}
  Object.keys(apis).forEach((key) => {
    if (Array.isArray(apis[key])) {
      apis[key].forEach((apiObj) => {
        /*
          apiObj.method:
            axios.request(config)
            axios.get(url[, config])
            axios.delete(url[, config])
            axios.head(url[, config])
            axios.options(url[, config])
            axios.post(url[, data[, config]])
            axios.put(url[, data[, config]])
            axios.patch(url[, data[, config]])
        */
        combinedApi[apiObj.name] = (data, config = {}) => {
          return apiInstant[apiObj.method](apiObj.path, data, { ...config, method: apiObj.method })
        }
      })
    }
  })
  return combinedApi
}


function apiManager() {
  // Create an object which maps keys to Apis
  let apis = {}

  // Create the initial combinedApi
  let combinedApi = combineApi(apis)

  return {
    getApisMap: () => apis,

    // getCombinedApis: () => combinedApi,

    call: (apiName, data, config) => {
      return combinedApi[apiName](data, config)
    },

    // The root Api function exposed by this object
    // This will be passed to the store
    reduce: () => {
      return combinedApi
    },

    // Adds a new Api with the specified key
    add: (key, api) => {
      if (!key || apis[key]) {
        return
      }

      // Add the Api to the Api mapping
      apis[key] = api

      // Generate a new combined Api
      combinedApi = combineApi(apis)
    },

    // Removes a Api with the specified key
    remove: key => {
      if (!key || !apis[key]) {
        return
      }

      // Remove it from the Api mapping
      delete apis[key]

      // Generate a new combined Api
      combinedApi = combineApi(apis)
    }
  }
}

export default apiManager