import React from 'react'
import { Route, Switch } from 'react-router'
import appRouteInstant from 'root/managers/appRoute/instant'
import authenRoute from 'root/features/authen/routes'
import adminRoute from 'root/features/admin/routes'
import showRoomRoute from 'root/features/showRoom/routes'
import portfolioV2Route from 'root/features/portfolio/routes'
import portfolioV1Route from 'root/features/portfoliov1/routes'
import eventEmitter from 'event-emitter'

const appRouteManager = appRouteInstant()
window.emitter = eventEmitter()

function AppRoute () {
  appRouteManager.add('authentication', authenRoute)
  appRouteManager.add('admin', adminRoute)
  appRouteManager.add('showRoom', showRoomRoute)
  appRouteManager.add('portfolioV2Route', portfolioV2Route)
  appRouteManager.add('portfolioV1Route', portfolioV1Route)

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