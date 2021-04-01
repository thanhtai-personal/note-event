import axios from 'axios'
import devConfig from './devConfig'
import prodConfig from './prodConfig'

let apiConfig = devConfig
if (process.env.NODE_ENV === 'production') {
  apiConfig = prodConfig
}

const apiExcutor = axios.create(apiConfig)
export default apiExcutor