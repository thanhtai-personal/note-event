import { all, call, spawn } from 'redux-saga/effects'

function* combineSagas(_sagas = []) {
  let sagas = []
  Object.keys(_sagas).forEach((key) => {
    sagas.push(_sagas[key])
  })
  yield all(sagas.map(saga =>
    spawn(function* () {
      let successCalledSagas = true
      while (successCalledSagas) {
        try {
          yield call(saga)
          break
        } catch (e) {
          successCalledSagas = false
        }
      }
    }))
  );
}

function createSagasManager() {
  // Create an object which maps keys to sagases
  let sagas = {}

  // Create the initial combinedSagas
  let combinedSagas = combineSagas(sagas)

  return {
    getSagasMap: () => sagas,

    // The root Sagas function exposed by this object
    // This will be passed to the store
    reduce: () => {
      return combinedSagas
    },

    // Adds a new Sagas with the specified key
    add: (key, saga) => {
      if (!key || sagas[key]) {
        return
      }

      // Add the Sagas to the Sagas mapping
      sagas[key] = saga

      // Generate a new combined Sagas
      combinedSagas = combineSagas(sagas)
    },

    // Removes a Sagas with the specified key
    remove: key => {
      if (!key || !sagas[key]) {
        return
      }

      // Remove it from the Sagas mapping
      delete sagas[key]

      // Generate a new combined Sagas
      combinedSagas = combineSagas(sagas)
    }
  }
}

export default createSagasManager