
const makeSagasActionType = (actionType) => {
  return {
    SUCCESS: `${actionType}_SUCCESS`,
    FAILED: `${actionType}_FAILED`,
  }
}

export const ADD_NEW_FEATURE = 'add-new-feature'

const actionHelper = {
  makeSagasActionType
}

export default actionHelper