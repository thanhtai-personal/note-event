export const adminApisName = {
  getUsers: 'getUser',
  getRoles: 'getRoles',
}

export const adminApis = {
  [adminApisName.getUsers]: {
    method: 'post',
    path: '/user/search',
  },
  [adminApisName.getRoles]: {
    method: 'post',
    path: '/role/search',
  }
}