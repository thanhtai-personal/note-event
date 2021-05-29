import React from 'react'
import { Route, Switch } from 'react-router'
import appRouteInstant from 'root/managers/appRoute/instant'
import authenRoute from 'root/features/authen/routes'
import adminRoute from 'root/features/admin/routes'
import showRoomRoute from 'root/features/showRoom/routes'
import eventEmitter from 'event-emitter'

const appRouteManager = appRouteInstant()
window.emitter = eventEmitter()

function AppRoute () {
  appRouteManager.add('authentication', authenRoute)
  appRouteManager.add('admin', adminRoute)
  appRouteManager.add('showRoom', showRoomRoute)

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