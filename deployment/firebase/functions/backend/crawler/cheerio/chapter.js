const crawlTruyenConvert = require('./truyenConvert')

const executeCrawler = async () => {
  try {
    let chapter = await crawlTruyenConvert.getNovalChapter(process.env['crawl-url'], -1)
    console.log('------------FINISH!!!--------------')
    return chapter
  } catch (error) {
    console.log('------------CHERRIO FAILED ACTION!!!--------------')
    throw error
  }
}

module.exports = executeCrawler