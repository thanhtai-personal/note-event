const { routeType } = require('./../constants')
const AdminService = require('../applicationService/admin.service')
const roleService = require('../domainService/role.service')
const permissionService = require('../domainService/permission.service')
const rolePermissionService = require('../domainService/rolePermission.service')
const accountService = require('../domainService/googleAccount.service')
const userService = require('../domainService/user.service')
const {
  SEARCH_USER,
  SEARCH_ROLE,
  SEARCH_PERMISSION
} = require('./routePaths')

const adminService = AdminService(userService, accountService, roleService, permissionService, rolePermissionService)

const searchUser = async (req, res) => {
  try {
    const dataReq = {
      ...req.body,
      authData: req.authData
    }
    const users = await adminService.searchUser(dataReq)
    res.status(200).send(users)
  } catch (error) {
      res.status(500).send(error)
  }
}

const searchPermission = async (req, res) => {
  try {
    const dataReq = {
      ...req.body,
      authData: req.authData
    }
    const permissions = await adminService.searchPermission(dataReq)
    res.status(200).send(permissions)
  } catch (error) {
      res.status(500).send(error)
  }
}

const searchRole = async (req, res) => {
  try {
    const dataReq = {
      ...req.body,
      authData: req.authData
    }
    const roles = await adminService.searchRole(dataReq)
    res.status(200).send(roles)
  } catch (error) {
      res.status(500).send(error)
  }
}

module.exports =  [
  {
    controllerExecution: searchUser,
    path: SEARCH_USER,
    method: routeType.POST
  },
  {
    controllerExecution: searchPermission,
    path: SEARCH_PERMISSION,
    method: routeType.POST
  },
  {
    controllerExecution: searchRole,
    path: SEARCH_ROLE,
    method: routeType.POST
  }
]