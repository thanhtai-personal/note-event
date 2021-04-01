const makeSagasActionType = (actionType) => {
  return {
    SUCCESS: `${actionType}_SUCCESS`,
    FAILED: `${actionType}_FAILED`,
  }
}

const actionHelpers = {
  makeSagasActionType
}

export default actionHelpers