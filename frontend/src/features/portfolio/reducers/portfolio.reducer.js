
// import Utils from 'root/utils'
import {
  SET_ACTIVE_MENU,
} from '../actions/types'

const initalState = {
  activeMenu: 'home'
}

const defaultReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_MENU:
      return {
        ...state,
        activeMenu: payload || 'home'
      }
    default:
      return state
  }
}

export default defaultReducer