import { 
  SEARCH_USER,
  SEARCH_ROLE
} from './../actions/types'
import actionHelpers from 'root/utils/actionHelpers'
const {
  makeSagasActionType,
} = actionHelpers

const initialState = {
  users: [],
  roles: []
}

const dashboardReducer = (state = initialState, { type, payload }) => {
  switch(type) {
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
    default:
      return state
  }
}

export default dashboardReducer