export const showRoomApiName = {
  getNovals: 'getNovals',
}

export const showRoomApis = {
  [showRoomApiName.getNovals]: {
    method: 'post',
    path: '/noval/search',
  }
}