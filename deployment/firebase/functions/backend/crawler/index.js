const cheerioCrawler = require('./cheerio');
// const puppeteerCrawler = require('./puppeteer');
const crawlChapter = require('./cheerio/chapter')
const crawlerNewChapter = require('./cheerio/newchapter')
const crawlNoval = require('./cheerio/noval')

const executeCrawler = async () => {
  try {
    return await cheerioCrawler.execute()
  } catch (error) {
    if (error.novals) {
      try {
        // await puppeteerCrawler.getNovalsChapters(error.novals)
      } catch (error) {
        console.log('error', error)
      }
    } else {
      try {
        // await puppeteerCrawler.execute()
      } catch (error) {
        console.log('error', error)
      }
    } 
  }
}

const crawlerSummary = async () => {
  try {
    return await cheerioCrawler.executeSummaryOnly()
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = {
  executeCrawler,
  crawlChapter,
  crawlerSummary,
  crawlerNewChapter,
  crawlNoval
}