import {
  SEARCH_USER,
  SEARCH_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
  EDIT_USER,
  DELETE_USER
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


export const editUser = (payload) => {
  return {
    type: EDIT_USER,
    payload
  }
}


export const deleteUser = (payload) => {
  return {
    type: DELETE_USER,
    payload
  }
}


export const editRole = (payload) => {
  return {
    type: EDIT_ROLE,
    payload
  }
}


export const deleteRole = (payload) => {
  return {
    type: DELETE_ROLE,
    payload
  }
}

