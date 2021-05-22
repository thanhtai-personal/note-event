const cheerioCrawler = require('./cheerio');
const puppeteerCrawler = require('./puppeteer');

const excuteCrawler = async () => {
  try {
    await cheerioCrawler.excute()
  } catch (error) {
    if (error.novals) {
      try {
        // await puppeteerCrawler.getNovalsChapters(error.novals)
      } catch (error) {
        console.log('error', error)
      }
    } else {
      try {
        // await puppeteerCrawler.excute()
      } catch (error) {
        console.log('error', error)
      }
    } 
  }
}

excuteCrawler() //for test

module.exports = {
  excuteCrawler
}