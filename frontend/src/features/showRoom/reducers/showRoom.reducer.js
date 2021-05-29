import {
  GET_NOVALS,
} from '../actions/types'
import actionHelpers from 'root/utils/actionHelpers'
const {
  makeSagasActionType,
} = actionHelpers

const initialState = {
  novals: [],
  novalLoading: false
}

const showRoomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOVALS:
      return {
        ...state,
        novalLoading: true
      }
    case makeSagasActionType(GET_NOVALS).SUCCESS:
      return {
        ...state,
        novalLoading: false,
        novals: payload
      }
    default:
      return state
  }
}

export default showRoomReducer