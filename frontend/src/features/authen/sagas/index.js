import Utils from 'root/utils'
import {
  //put
  takeLatest
  , all
  , put
} from 'redux-saga/effects'

import {
  LOGIN,
  SIGNUP,
  GOOGLE_LOGIN
} from './../actions/types'
import { authenApiNames, authenApis } from './../apis'
import apiExecutor from 'root/api'

function* loginSagas(action = {}) {
  try {
    const { method, path } = authenApis[authenApiNames.login]
    const responseData = yield apiExecutor[method](path, action.payload || {}).then(response => response)
    yield put({ type: Utils.makeSagasActionType(LOGIN).SUCCESS, payload: responseData?.data || {} })
  } catch (error) {
    yield put({ type: Utils.makeSagasActionType(LOGIN).FAILED, payload: error || {} })
  }
}

function* signupSagas(action = {}) {
  try {
    const { method, path } = authenApis[authenApiNames.signup]
    const responseData = yield apiExecutor[method](path, action.payload || {}).then(response => response)
    yield put({ type: Utils.makeSagasActionType(SIGNUP).SUCCESS, payload: responseData?.data || {} })
  } catch (error) {
    yield put({ type: Utils.makeSagasActionType(SIGNUP).FAILED, payload: error || {} })
  }
}

export default function* authWatchers() {
  yield all([
    takeLatest(LOGIN, loginSagas),
    takeLatest(SIGNUP, signupSagas),
    takeLatest(GOOGLE_LOGIN, loginSagas)
  ])
}
