const executeCrawler = require('./cheerio/noval')
const NovalManageService = require('./../applicationService/novalManage.service')
const novalService = require('../domainService/noval.service')
const chapterService = require('../domainService/chapter.service')

const novalManageService = NovalManageService(novalService, chapterService)

const execute = async () => {
  let noval = {}
  try {
    noval = await executeCrawler()
  } catch (error) {
    console.log('crawler failed', error)
  }
  try {
    console.log('----insert noval', noval.url)
    await novalManageService.addnoval(noval)
    console.log('----insert noval success', noval.url)
  } catch (error) {
    console.log('----insert noval failed', noval.url)
  }
}

execute()