const getNovals = (novalService) => async (dataReq) => {
  try {

  } catch (error) {
    throw error
  }
}

const getNovalById = (novalService, chapterService) => async (dataReq) => {
  try {

  } catch (error) {
    throw error
  }
}

const addNoval = (novalService, chapterService) => async (dataReq) => {
  try {

  } catch (error) {
    throw error
  }
}

const updateNoval = (novalService, chapterService) => async (dataReq) => {
  try {

  } catch (error) {
    throw error
  }
}

const searchNovals = (novalService) => async (dataReq) => {
  try {

  } catch (error) {
    throw error
  }
}

// to apply dependency injection
const novalManageService = (novalService, chapterService) => ({
  getNovals: getNovals(novalService),
  getNovalById: getNovalById(novalService, chapterService),
  addNoval: addNoval(novalService, chapterService),
  updateNoval: updateNoval(novalService, chapterService),
  searchNovals: searchNovals(novalService)
})

module.exports = novalManageService