const getNovals = (novalService) => async (dataReq) => {
  try {
    const novals = await novalService.findAll()
    return novals
  } catch (error) {
    throw error
  }
}

const getNovalById = (novalService, chapterService) => async (dataReq) => {
  try {
    const noval = await novalService.findOne({
      where: {
        id: dataReq.novalId
      }
    })
    const chapters = chapterService.findAll({
      where: {
        novalId: dataReq.novalId
      }
    })
    return {
      ...noval,
      chapters
    }
  } catch (error) {
    throw error
  }
}

const addNoval = (novalService, chapterService) => async (dataReq) => {
  try {
    let { chapters, ...novalData } = dataReq
    const noval = await novalService.create(novalData)
    let savedChapters = []
    if (!noval.isBlockedScrap) {
      for (chapter of chapters) {
        const c = await chapterService.create({
          ...chapter,
          novalId: noval.id
        })
        savedChapters.push(c)
      }
    }
    return { noval, chapters: savedChapters }
  } catch (error) {
    throw error
  }
}

const updateNoval = (novalService, chapterService) => async (dataReq) => {
  try {
    const { id, chapters = [], nestedDataReq } = dataReq
    const noval = await novalService.update({
      ...nestedDataReq
    }, {
      where: {
        id: id
      }
    })
    for (chapter of chapters) {
      if (chapter.chapterNumber > noval.chapterNumber) {
        await chapterService.create({
          ...chapter,
          novalId: id
        })
      }
    }
    return {
      ...noval,
      chapters
    }
  } catch (error) {
    throw error
  }
}

const searchNovals = (novalService) => async (dataReq) => {
  try {
    return getNovals(novalService)(dataReq)
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