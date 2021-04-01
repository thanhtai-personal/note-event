import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware  from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import loggerMiddleware from 'root/middlewares/logger.middlewares'
import createReducerManager from 'root/managers/reducer/instant'
import createSagasManager from 'root/managers/sagas/instant'

export default function configureStore(initialState, history) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, routerMiddleware(history)]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(loggerMiddleware)
  }
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)
  const reducerManager = createReducerManager(history)
  const sagasManager = createSagasManager()

  const store = createStore(reducerManager.reduce, initialState, composedEnhancers)

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {}

  sagaMiddleware.run(sagasManager.reduce)
  
  store.reducerManager = reducerManager
  store.sagasManager = sagasManager
  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.updateReducer = () => {
    store.replaceReducer(store.reducerManager.reduce)
  }
  store.updateSagas = () => {
    sagaMiddleware.run(sagasManager.reduce)
  }

  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('root/managers/reducer/instant', () => store.updateReducer())
  //   module.hot.accept('root/managers/sagas/instant', () => store.updateSagas())
  // }

  return store
}