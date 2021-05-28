import Utils from 'root/utils'
import {
  //put
  takeLatest
  , all
  , put
} from 'redux-saga/effects'

import {
  SEARCH_USER,
  SEARCH_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
  EDIT_USER,
  DELETE_USER,
  GET_NOVALS,
  CRAWL_ALL
} from './../actions/types'
import { adminApisName, adminApis } from './../apis'
import apiExecutor from 'root/api'

const defaultAdminSagasAction = (apiName, headers, actionType) => {
  return function* (action = {}) {
    try {
      const { method, path } = adminApis[apiName]
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

const searchUser = defaultAdminSagasAction(adminApisName.getUsers, null, SEARCH_USER)

const searchRole = defaultAdminSagasAction(adminApisName.getRoles, null, SEARCH_ROLE)

const deleteUser = defaultAdminSagasAction(adminApisName.deleteUser, null, DELETE_USER)

const deleteRole = defaultAdminSagasAction(adminApisName.deleteRole, null, DELETE_ROLE)

const editUser = defaultAdminSagasAction(adminApisName.editUser, null, EDIT_USER)

const editRole = defaultAdminSagasAction(adminApisName.editRole, null, EDIT_ROLE)

const getNovals = defaultAdminSagasAction(adminApisName.getNovals, null, GET_NOVALS)

const crawlAll = defaultAdminSagasAction(adminApisName.crawlAll, null, CRAWL_ALL)

export default function* adminWatchers() {
  yield all([
    takeLatest(SEARCH_USER, searchUser),
    takeLatest(SEARCH_ROLE, searchRole),
    takeLatest(DELETE_USER, deleteUser),
    takeLatest(EDIT_USER, editUser),
    takeLatest(EDIT_ROLE, editRole),
    takeLatest(DELETE_ROLE, deleteRole),
    takeLatest(GET_NOVALS, getNovals),
    takeLatest(CRAWL_ALL, crawlAll),
  ])
}
