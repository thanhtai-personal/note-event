
const searchUser = (userService) => async (dataReq) => {
  try {
    const users = await userService.findAll()
    return users
  } catch (error) {
    throw error
  }
}

const searchRole = (roleService) => async (dataReq) => {
  try {
    const users = await roleService.findAll()
    return users
  } catch (error) {
    throw error
  }
}

const searchPermission = (permissionService) => async (dataReq) => {
  try {
    const users = await permissionService.findAll()
    return users
  } catch (error) {
    throw error
  }
}

const addPermissionToRole = (rolePermissionService) => async (dataReq) => {
  try {
    const users = await rolePermissionService.create(dataReq)
    return users
  } catch (error) {
    throw error
  }
}

// to apply dependency injection
const authService = (userService, googleAccountService
    , roleService, permissionService, rolePermissionService
  ) => ({
  searchUser: searchUser(userService, googleAccountService),
  searchRole: searchRole(roleService),
  searchPermission: searchPermission(permissionService),
  addPermissionToRole: addPermissionToRole(rolePermissionService)
})

module.exports = authService