const crawlTruyenConvert = require('./truyenConvert')

const executeCrawler = async () => {
  try {
    let noval = await crawlTruyenConvert.getNovalDetail(process.env['crawl-url'], -1)
    console.log('------------FINISH!!!--------------')
    return noval
  } catch (error) {
    console.log('------------CHERRIO FAILED ACTION!!!--------------')
    throw error
  }
}

module.exports = executeCrawler