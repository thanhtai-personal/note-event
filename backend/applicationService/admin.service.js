const { Op } = require('sequelize')
const { adminRoles } = require('./constants')

const checkAdmin = async (roleService, authData) => {
  try {
    const role = await roleService.findOne({
      where: {
        id: authData.roleId || ''
      }
    })
    return adminRoles.includes((role.name || '').toLowerCase())
  } catch (error) {
    throw (error)
  }
}

const searchUser = (userService, accountService, roleService) => async (dataReq) => {
  if (!await checkAdmin(roleService, dataReq.authData)) {
    throw {
      message: 'not admin'
    }
  }
  try {
    const users = await userService.findAll({
      where: {
        username: {
          [Op.not]: 'superadmin'
        }
      }
    })
    return users
  } catch (error) {
    throw error
  }
}

const searchRole = (roleService) => async (dataReq) => {
  if (!await checkAdmin(roleService, dataReq.authData)) {
    throw {
      message: 'not admin'
    }
  }
  try {
    const roles = await roleService.findAll(
      {
        where: {
          name: {
            [Op.not]: 'superadmin'
          }
        }
      }
    )
    return roles
  } catch (error) {
    throw error
  }
}

const searchPermission = (permissionService, roleService) => async (dataReq) => {
  if (!await checkAdmin(roleService, dataReq.authData)) {
    throw {
      message: 'not admin'
    }
  }
  try {
    const permissions = await permissionService.findAll()
    return permissions
  } catch (error) {
    throw error
  }
}

const addPermissionToRole = (roleService, rolePermissionService) => async (dataReq) => {
  if (!await checkAdmin(roleService, dataReq.authData)) {
    throw {
      message: 'not admin'
    }
  }
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
  searchUser: searchUser(userService, googleAccountService, roleService),
  searchRole: searchRole(roleService),
  searchPermission: searchPermission(permissionService, roleService),
  addPermissionToRole: addPermissionToRole(rolePermissionService, roleService)
})

module.exports = authService