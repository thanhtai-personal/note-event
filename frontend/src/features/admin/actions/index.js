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
    data
  }
}

export const searchRole = (data) => {
  return {
    type: SEARCH_ROLE,
    data
  }
}

export const editUser = (data) => {
  return {
    type: EDIT_USER,
    data
  }
}

export const deleteUser = (data) => {
  return {
    type: DELETE_USER,
    data
  }
}

export const editRole = (data) => {
  return {
    type: EDIT_ROLE,
    data
  }
}

export const deleteRole = (data) => {
  return {
    type: DELETE_ROLE,
    data
  }
}

export const getNovals = (data) => {
  return {
    type: GET_NOVALS,
    data
  }
}

export const crawlAll = (data) => {
  return {
    type: CRAWL_ALL,
    data
  }
}

