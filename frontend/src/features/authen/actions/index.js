import {
  LOGIN,
  SIGNUP
} from './types'

export const login = (key, value) => {
  let payload = {
    [key]: value
  }
  return {
    type: LOGIN,
    payload
  }
}

export const signup = (data) => {
  return {
    type: SIGNUP,
    payload: data
  }
}
