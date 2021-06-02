import {
  PORTFOLIO_ACTION,
  SET_ACTIVE_MENU
} from './types'

export const portfolioActions = (key, value) => {
  let payload = {
    [key]: value
  }
  return {
    type: PORTFOLIO_ACTION,
    payload
  }
}

export const globalSetActiveMenu = (value) => {
  return {
    type: SET_ACTIVE_MENU,
    payload: value
  }
}
