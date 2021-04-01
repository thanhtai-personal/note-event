import useMultiThemes from './theme'
import { hocKeys } from 'root/utils'

const combineHoc = (hocObj) => {
  return Object.keys(hocObj).map((key) => hocObj[key])
}

function createHocs() {
  // Create an object which maps keys to hocs
  const hocObj = {
    [hocKeys.multiTheme]: useMultiThemes
  }
  // Create the initial combinedHOC
  let hocs = [useMultiThemes]

  return {
    getHocsMap: () => hocObj,

    // The root HOC function exposed by this object
    reduce: () => {
      return hocs
    },


    call: (hocName, wrappedComponent) => {
      return hocObj[hocName](wrappedComponent)
    },

    // Adds a new HOC with the specified key
    add: (key, hoc) => {
      if (!key || hocObj[key]) {
        return
      }

      // Add the HOC to the HOC mapping
      hocObj[key] = hoc

      // Generate a new combined HOC
      hocs = combineHoc(hocObj)
    },

    // Removes a HOC with the specified key
    remove: key => {
      if (!key || !hocObj[key]) {
        return
      }

      // Remove it from the HOC mapping
      delete hocObj[key]

      // Generate a new combined HOC
      hocs = combineHoc(hocObj)
    }
  }
}

export default createHocs