import {
  GET_NOVALS,
} from './types'


export const getNovals = (data) => {
  return {
    type: GET_NOVALS,
    payload: data
  }
}
