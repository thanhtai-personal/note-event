import Utils from 'root/utils'
import {
  //put
  takeLatest
  , all
  , put
} from 'redux-saga/effects'

import {
  GET_NOVALS,
} from './../actions/types'
import { showRoomApiName, showRoomApis } from './../apis'
import apiExecutor from 'root/api'

const defaultShowRoomSagasAction = (apiName, headers, actionType) => {
  return function* (action = {}) {
    try {
      const { method, path } = showRoomApis[apiName]
      const responseData = yield apiExecutor[method](path, action.payload || {}, {
        headers: headers || {
          token: window.localStorage.getItem('token')
        }
      }).then(response => response)
      yield put({ type: Utils.makeSagasActionType(actionType).SUCCESS, payload: responseData?.data || {} })
    } catch (error) {
      yield put({ type: Utils.makeSagasActionType(actionType).FAILED, payload: error || {} })
    }
  }
}

const getNovals = defaultShowRoomSagasAction(showRoomApiName.getNovals, null, GET_NOVALS)

export default function* showRoomWatchers() {
  yield all([
    takeLatest(GET_NOVALS, getNovals),
  ])
}
