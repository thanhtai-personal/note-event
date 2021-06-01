import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import AppRoute from './appRoute'
import StoreSingleton from './store/instant'
import reportWebVitals from './reportWebVitals'

const store = StoreSingleton.getInstance().store
const history = StoreSingleton.getInstance().history
const NODE_MOUNT = document.getElementById('root')

const renderApp = () =>
  render(
    <React.StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppRoute />
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>,
    NODE_MOUNT
  )

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./appRoute', renderApp)
}

render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppRoute />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
