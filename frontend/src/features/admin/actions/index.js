import {
  SEARCH_USER,
  SEARCH_ROLE
} from './types'

export const searchUser = (payload) => {
  return {
    type: SEARCH_USER,
    payload
  }
}

export const searchRole = (payload) => {
  return {
    type: SEARCH_ROLE,
    payload
  }
}

