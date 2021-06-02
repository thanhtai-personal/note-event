import {
  UPDATE_IMAGE_SIZE,
  UPDATE_GRID_SIZE,
  UPDATE_GRID_VALUE,
  RESET_GRID
} from './../actions/types'

const gridImageReducer = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_IMAGE_SIZE:
      return {
        ...state,
        imageWidth: payload.width,
        imageHeight: payload.height
      }
    case UPDATE_GRID_SIZE:
      return {
        ...state,
        gridWidth: payload.width,
        gridHeight: payload.height
      }
    case UPDATE_GRID_VALUE:
      return {
        ...state,
        gridValue: payload
      }
    case RESET_GRID: 
      return {
        ...state,
        imageWidth: 0,
        imageHeight: 0,
        gridValue: 1,
        gridWidth: 0,
        gridHeight: 0,
      }
    default:
      return state
  }
}

export default gridImageReducer