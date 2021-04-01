import React from 'react'
import { Route, Switch } from 'react-router'
import appRouteInstant from 'root/managers/appRoute/instant'
import authenRoute from 'root/features/authen/routes'
import eventEmitter from 'event-emitter'

const appRouteManager = appRouteInstant()
window.emitter = eventEmitter()

function AppRoute () {
  appRouteManager.add('authentication', authenRoute)

  return (
    <> { /* your usual react-router v4/v5 routing */}
      <Switch>
        {appRouteManager.reduce()}
        <Route render={() => (<div>Route not found!</div>)} />
      </Switch>
    </>
  );
}

export default AppRoute