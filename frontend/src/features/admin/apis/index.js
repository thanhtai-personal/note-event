export const adminApisName = {
  getUsers: 'getUser',
}

export const adminApis = {
  [adminApisName.getUsers]: {
    method: 'post',
    path: '/user/search',
  }
}