const { routeType } = require('./../constants')
const AdminService = require('../applicationService/admin.service')
const userService = require('../domainService/user.service')
const {
  SEARCH_USER
} = require('./routePaths')

const adminService = AdminService(userService)

const searchUser = async (req, res) => {
  try {
    const dataReq = {
      ...req.body
    }
    const users = await adminService.searchUser(dataReq)
    res.status(200).send(users)
  } catch (error) {
      res.status(500).send(error)
  }
}

module.exports =  [
  {
    controllerExecution: searchUser,
    path: SEARCH_USER,
    method: routeType.POST
  }
]