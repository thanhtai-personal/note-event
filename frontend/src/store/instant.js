import configureStore from './store'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

var StoreSingleton = (() => {
  var store;
  return {
    getInstance: function () {
      // check if instance is available
      if (!store) {
        store = configureStore({}, history);
      }
      return { store, history };
    }
  };
})();

export default StoreSingleton;