const executeCrawler = require('./cheerio/newchapter')
const NovalManageService = require('./../applicationService/novalManage.service')
const novalService = require('../domainService/noval.service')
const chapterService = require('../domainService/chapter.service')

const novalManageService = NovalManageService(novalService, chapterService)

const execute = async () => {
  let chapter = {}
  try {
    chapter = await executeCrawler()
  } catch (error) {
    console.log('crawler failed', error)
  }
  try {
    console.log('----insert chapter', chapter.url)
    await novalManageService.addChapter(chapter)
    console.log('----insert chapter success', chapter.url)
  } catch (error) {
    console.log('----insert chapter failed', chapter.url)
  }
}

execute()