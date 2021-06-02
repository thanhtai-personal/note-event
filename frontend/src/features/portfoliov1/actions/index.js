import {
  DEFAULT_ACTION
} from './types'

export const defaultAction = (key, value) => {
  let payload = {
    [key]: value
  }
  return {
    type: DEFAULT_ACTION,
    payload
  }
}
