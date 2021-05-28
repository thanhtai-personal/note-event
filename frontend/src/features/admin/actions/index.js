import {
  SEARCH_USER,
  SEARCH_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
  EDIT_USER,
  DELETE_USER,
  GET_NOVALS,
  CRAWL_ALL
} from './types'

export const searchUser = (data) => {
  return {
    type: SEARCH_USER,
    payload: data
  }
}

export const searchRole = (data) => {
  return {
    type: SEARCH_ROLE,
    payload: data
  }
}

export const editUser = (data) => {
  return {
    type: EDIT_USER,
    payload: data
  }
}

export const deleteUser = (data) => {
  return {
    type: DELETE_USER,
    payload: data
  }
}

export const editRole = (data) => {
  return {
    type: EDIT_ROLE,
    payload: data
  }
}

export const deleteRole = (data) => {
  return {
    type: DELETE_ROLE,
    payload: data
  }
}

export const getNovals = (data) => {
  return {
    type: GET_NOVALS,
    payload: { page: data }
  }
}

export const crawlAll = (data) => {
  return {
    type: CRAWL_ALL,
    payload: data
  }
}

