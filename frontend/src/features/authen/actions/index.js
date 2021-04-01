import {
  LOGIN,
  SIGNUP,
  UPDATEINPUT,
  GOOGLE_LOGIN,
  GETAUTH
} from './types'

export const login = (data) => {
  return {
    type: LOGIN,
    payload: data
  }
}

export const register = (data) => {
  return {
    type: SIGNUP,
    payload: data
  }
}

export const updateInputData = (form, key, value) => {
  return {
    type: UPDATEINPUT,
    payload: { form, key, value }
  }
}

export const updateGoogleLoginData = (data) => {
  return {
    type: GOOGLE_LOGIN,
    payload: data,
  }
}


export const getAuth = (token) => {
  return {
    type: GETAUTH,
    payload: token,
  }
}

