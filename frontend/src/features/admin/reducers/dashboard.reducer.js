import {
  SEARCH_USER,
  SEARCH_ROLE,
  GET_NOVALS,
  CRAWL_ALL
} from './../actions/types'
import actionHelpers from 'root/utils/actionHelpers'
const {
  makeSagasActionType,
} = actionHelpers

const initialState = {
  users: [],
  roles: [],
  novals: [],
  novalLoading: false,
  crawlAllLoading: false
}

const dashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case makeSagasActionType(SEARCH_USER).SUCCESS:
      return {
        ...state,
        users: payload
      }
    case makeSagasActionType(SEARCH_ROLE).SUCCESS:
      return {
        ...state,
        roles: payload
      }
    case GET_NOVALS:
      return {
        ...state,
        novalLoading: true
      }
    case CRAWL_ALL:
      return {
        ...state,
        crawlAllLoading: true
      }
    case makeSagasActionType(GET_NOVALS).SUCCESS:
      return {
        ...state,
        novalLoading: false,
        novals: payload
      }
    case makeSagasActionType(CRAWL_ALL).SUCCESS:
      return {
        ...state,
        crawlAllLoading: false,
        novals: payload
      }
    default:
      return state
  }
}

export default dashboardReducer