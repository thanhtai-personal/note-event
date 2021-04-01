import Utils from 'root/utils'
import {
  //put
  takeLatest
  , all
  , put
} from 'redux-saga/effects'

import {
  LOGIN,
  SIGNUP
} from './../actions/types'
import { authenApiNames } from './../apis'
import apiManagerInstant from 'root/managers/api/instant'

const apiManager = apiManagerInstant()

function* loginSagas(action = {}) {
  const defaultRes = yield apiManager.call(authenApiNames.login, action.payload || {}).then(response => response)
  yield put({ type: Utils.makeSagasActionType(LOGIN).SUCCESS, payload: defaultRes || {} })
}

function* signupSagas(action = {}) {
  const defaultRes = yield apiManager.call(authenApiNames.signup, action.payload || {}).then(response => response)
  yield put({ type: Utils.makeSagasActionType(LOGIN).SUCCESS, payload: defaultRes || {} })
}

export default function* defaultWatcher() {
  yield all([
    takeLatest(LOGIN, loginSagas),
    takeLatest(SIGNUP, signupSagas)
  ])
}
