

const getAllEventNote = (eventNoteService) => async (dataReq) => {
  try {
    const eventNotes = eventNoteService.findAll({
      where: {
        userId: dataReq.userId,
        isActive: true
      },
      limit: dataReq.take || 50,
      offset: dataReq.skip
    })
    return eventNotes
  } catch (error) {
    throw error
  }
}

const getEventNoteDetail = (eventNoteService) => async (dataReq) => {
  try {

  } catch (error) {
    throw error
  }
}

const createEventNote = (resourceService, eventNoteService) => async (dataReq) => {
  try {

  } catch (error) {
    throw error
  }
}

const updateEventNote = (resourceService, eventNoteService) => async (dataReq) => {
  try {

  } catch (error) {
    throw error
  }
}

const deleteEventNote = (resourceService, eventNoteService) => async (dataReq) => {
  try {

  } catch (error) {
    throw error
  }
}

// to apply dependency injection
const noteService = (resourceService, eventNoteService) => ({
  getAllEventNote: getAllEventNote(eventNoteService),
  getEventNoteDetail: getEventNoteDetail(eventNoteService),
  createEventNote: createEventNote(resourceService, eventNoteService),
  updateEventNote: updateEventNote(resourceService, eventNoteService),
  deleteEventNote: deleteEventNote(resourceService, eventNoteService),
})

module.exports = noteService