const crawlTruyenConvert = require('./truyenConvert')

const executeCrawler = async () => {
  try {
    let novals = await crawlTruyenConvert.getNovalsSummaryInfo()
    return novals
  } catch (error) {
    console.log('------------CHERRIO FAILED ACTION!!!--------------')
    throw error
  }
}

module.exports = executeCrawler