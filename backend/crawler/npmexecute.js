const crawler = require('./index')
const NovalManageService = require('./../applicationService/novalManage.service')
const novalService = require('../domainService/noval.service')
const chapterService = require('../domainService/chapter.service')

const novalManageService = NovalManageService(novalService, chapterService)

const execute = async () => {
  let novals = []
  try {
    novals = await crawler.executeCrawler()
  } catch (error) {
    console.log('crawler failed', error)
  }

  for (noval of novals) {
    try {
      console.log('----insert noval', noval.url)
      novalManageService.addNoval(noval)
      console.log('----insert noval success', noval.url)
    } catch (error) {
      console.log('----insert noval failed', noval.url)
      continue
    }
  }
}

execute()