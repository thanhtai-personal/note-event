import { 
  SEARCH_USER  
} from './../actions/types'
import actionHelpers from 'root/utils/actionHelpers'
const {
  makeSagasActionType,
} = actionHelpers

const initialState = {

}

const dashboardReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case makeSagasActionType(SEARCH_USER).SUCCESS:
      return {
        ...state,
        users: payload
      }
    default:
      return state
  }
}

export default dashboardReducer