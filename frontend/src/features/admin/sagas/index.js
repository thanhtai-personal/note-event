import Utils from 'root/utils'
import {
  //put
  takeLatest
  , all
  , put
} from 'redux-saga/effects'

import {
  SEARCH_USER
} from './../actions/types'
import { adminApisName, adminApis } from './../apis'
import apiExecutor from 'root/api'

function* searchUser(action = {}) {
  try {
    const { method, path } = adminApis[adminApisName.getUsers]
    const responseData = yield apiExecutor[method](path, action.payload || {}).then(response => response)
    yield put({ type: Utils.makeSagasActionType(SEARCH_USER).SUCCESS, payload: responseData || {} })
  } catch (error) {
    yield put({ type: Utils.makeSagasActionType(SEARCH_USER).FAILED, payload: error || {} })
  }
}

export default function* adminWatchers() {
  yield all([
    takeLatest(SEARCH_USER, searchUser),
  ])
}
