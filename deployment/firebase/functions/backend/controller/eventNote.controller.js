const { routeType } = require('./../constants')
const NoteService = require('../applicationService/eventNote.service')
const userService = require('../domainService/user.service')
const eventNoteService = require('../domainService/eventNote.service')
const {
  GET_EVENT_NOTES,
  GET_EVENT_NOTE_DETAIL,
  CREATE_EVENT_NOTE,
  UPDATE_EVENT_NOTE,
  DELETE_EVENT_NOTE
} = require('./routePaths')

const noteService = NoteService(userService, eventNoteService)

const getAllEventNote = async (req, res) => {
  try {
    const reqData = {
      userId: req.authData.id,
      skip: req.query.skip,
      take: req.query.take,
    }
    const responseData = await noteService.getAllEventNote(reqData)
    res.status(200).send(responseData)
  } catch (error) {
    res.status(500).send(error)
  }
}

const createEventNote = async (req, res) => {
  
}

const updateEventNote = async (req, res) => {
  
}

const deleteEventNote = async (req, res) => {
  
}

const getEventNoteDetail = async (req, res) => {
  
}

module.exports =  [
  {
    controllerExecution: getAllEventNote,
    path: GET_EVENT_NOTES,
    method: routeType.GET
  },
  {
    controllerExecution: createEventNote,
    path: CREATE_EVENT_NOTE,
    method: routeType.POST
  },
  {
    controllerExecution: updateEventNote,
    path: UPDATE_EVENT_NOTE,
    method: routeType.POST
  },
  {
    controllerExecution: deleteEventNote,
    path: DELETE_EVENT_NOTE,
    method: routeType.POST
  },
  {
    controllerExecution: getEventNoteDetail,
    path: GET_EVENT_NOTE_DETAIL,
    method: routeType.GET
  },
]