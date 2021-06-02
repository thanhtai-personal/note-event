
import {
  UPDATE_ACTIVE_LEFT_MENU,
} from '../actions/types'

const leftMenuReducer = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_ACTIVE_LEFT_MENU:
      let { menuItems = [] } = state
      menuItems = menuItems.map((item) => ({
        ...item,
        active: item.key === payload
      }))
      return {
        ...state,
        menuItems
      }
    default:
      return state
  }
}

export default leftMenuReducer