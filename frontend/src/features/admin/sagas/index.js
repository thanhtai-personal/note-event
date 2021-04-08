import Utils from 'root/utils'
import {
  //put
  takeLatest
  , all
  , put
} from 'redux-saga/effects'

import {
  SEARCH_USER,
  SEARCH_ROLE
} from './../actions/types'
import { adminApisName, adminApis } from './../apis'
import apiExecutor from 'root/api'

function* searchUser(action = {}) {
  try {
    const { method, path } = adminApis[adminApisName.getUsers]
    const responseData = yield apiExecutor[method](path, action.payload || {}, {
      headers: {
        token: window.localStorage.getItem('token')
      }
    }).then(response => response)
    yield put({ type: Utils.makeSagasActionType(SEARCH_USER).SUCCESS, payload: responseData?.data || {} })
  } catch (error) {
    yield put({ type: Utils.makeSagasActionType(SEARCH_USER).FAILED, payload: error || {} })
  }
}


function* searchRole(action = {}) {
  try {
    const { method, path } = adminApis[adminApisName.getRoles]
    const responseData = yield apiExecutor[method](path, action.payload || {}, {
      headers: {
        token: window.localStorage.getItem('token')
      }
    }).then(response => response)
    yield put({ type: Utils.makeSagasActionType(SEARCH_ROLE).SUCCESS, payload: responseData?.data || {} })
  } catch (error) {
    yield put({ type: Utils.makeSagasActionType(SEARCH_ROLE).FAILED, payload: error || {} })
  }
}

export default function* adminWatchers() {
  yield all([
    takeLatest(SEARCH_USER, searchUser),
    takeLatest(SEARCH_ROLE, searchRole),
  ])
}
