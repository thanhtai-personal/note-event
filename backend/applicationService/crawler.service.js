const crawler = require('./../crawler')

const crawlFullSite = (novalService, chapterService) => async (dataReq) => {
  try {
    let novals = []
    const { site = '' } = dataReq
    try {
      novals = await crawler.executeCrawler(site)
    } catch (error) {
      console.log('crawler failed', error)
    }

    for (noval of novals) {
      try {
        console.log('----insert noval', noval.url)
        let { chapters, ...novalData } = noval
        noval = await novalService.create(novalData)
        if (!noval.isBlockedScrap) {
          for (chapter of chapters) {
            await chapterService.create({
              ...chapter,
              novalId: noval.id
            })
          }
        }
        console.log('----insert noval success', noval.url)
      } catch (error) {
        console.log('----insert noval failed', noval.url)
        continue
      }
    }
    return novals
  } catch (error) {
    throw error
  }
}

const crawlNoval = (novalService, chapterService) => async (dataReq) => {
  try {
    let noval = crawler.crawlNoval(dataReq.url)
    console.log('----insert noval', noval.url)
    let { chapters, ...novalData } = noval
    noval = await novalService.create(novalData)
    if (!noval.isBlockedScrap) {
      for (chapter of chapters) {
        await chapterService.create({
          ...chapter,
          novalId: noval.id
        })
      }
    }
    console.log('----insert noval success', noval.url)
  } catch (error) {
    throw error
  }
}

const crawlChapter = (chapterService) => async (dataReq) => {
  try {
    let chapter = crawler.crawlChapter(dataReq.url)
    await chapterService.create({
      ...chapter,
      novalId: dataReq.novalId
    })
  } catch (error) {
    throw error
  }
}

const crawlAllNewChapter = (novalService, chapterService) => async (dataReq) => {
  try {
    const novals = crawler.crawlerSummary(dataReq.siteUrl)
    for (noval of novals) {
      const currentNoval = await novalService.findOne({
        where: {
          name: noval.name
        }
      })
      if (currentNoval) {
        if (noval.chapNumber > currentNoval.chapNumber) {
          for (let i = currentNoval.chapNumber; i <= noval.chapNumber; i++) {
            await crawlChapter(novalService, chapterService)({ url: noval.chapters[i-1].url })
          }
        }
      } else {
        await crawlNoval(novalService, chapterService)({ ...noval })
      }
    }
  } catch (error) {
    throw error
  }
}

// to apply dependency injection
const crawlerService = (novalService, chapterService) => ({
  crawlFullSite: crawlFullSite(novalService, chapterService),
  crawlNoval: crawlNoval(novalService, chapterService),
  crawlChapter: crawlChapter(novalService, chapterService),
  crawlAllNewChapter: crawlAllNewChapter(novalService, chapterService)
})

module.exports = crawlerService