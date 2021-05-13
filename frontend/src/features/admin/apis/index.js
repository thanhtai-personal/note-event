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
  },
  [adminApisName.editRole]: {
    method: 'post',
    path: '/role/update',
  },
  [adminApisName.deleteRole]: {
    method: 'post',
    path: '/role/update',
  },
  [adminApisName.editUser]: {
    method: 'post',
    path: '/user/update',
  },
  [adminApisName.deleteUser]: {
    method: 'post',
    path: '/user/update',
  }
}