import {
  SEARCH_USER
} from './types'

export const searchUser = (payload) => {
  return {
    type: SEARCH_USER,
    payload
  }
}

