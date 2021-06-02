

import Utils from 'root/utils'
import {
  //put
  takeLatest
  , all
  , put
} from 'redux-saga/effects'

import {
  PORTFOLIO_ACTION
} from './../actions/types'

function* portfolioSaga(action = {}) {
  yield put({ type: Utils.makeSagasActionType(PORTFOLIO_ACTION).SUCCESS, payload: {} })
}

export default function* portfolioWatcher() {
  yield all([
    takeLatest(PORTFOLIO_ACTION, portfolioSaga)
  ])
}
