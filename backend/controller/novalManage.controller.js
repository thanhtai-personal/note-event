const { routeType } = require('./../constants')
const NovalManageService = require('../applicationService/novalManage.service')
const novalService = require('../domainService/noval.service')
const chapterService = require('../domainService/chapter.service')
const {
  GET_NOVAL,
  SEARCH_NOVALS,
  ADD_NOVAL,
  UPDATE_NOVAL
} = require('./routePaths')

const novalManageService = NovalManageService(novalService, chapterService)

const getNoval = async (req, res) => {
  try {
    const reqData = {
    }
    const responseData = await novalManageService.getNovalById(reqData)
    res.status(200).send(responseData)
  } catch (error) {
    res.status(500).send(error)
  }
}

const searchNovals = async (req, res) => {
  try {
    const reqData = {
    }
    const responseData = await novalManageService.searchNovals(reqData)
    res.status(200).send(responseData)
  } catch (error) {
    res.status(500).send(error)
  }
}

const addNoval = async (req, res) => {
  try {
    const reqData = {
    }
    const responseData = await novalManageService.addNoval(reqData)
    res.status(200).send(responseData)
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateNoval = async (req, res) => {
  try {
    const reqData = {
    }
    const responseData = await novalManageService.updateNoval(reqData)
    res.status(200).send(responseData)
  } catch (error) {
    res.status(500).send(error)
  }
}
module.exports =  [
  {
    controllerExecution: searchNovals,
    path: SEARCH_NOVALS,
    method: routeType.POST
  },
  {
    controllerExecution: getNoval,
    path: GET_NOVAL,
    method: routeType.GET
  },
  {
    controllerExecution: addNoval,
    path: ADD_NOVAL,
    method: routeType.POST
  },
  {
    controllerExecution: updateNoval,
    path: UPDATE_NOVAL,
    method: routeType.POST
  },
]