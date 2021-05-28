const crawlTruyenConvert = require('./truyenConvert')

const executeCherrio = async () => {
  try {
    let novals = await crawlTruyenConvert.getNovalsSummaryInfo()
    novals = await crawlTruyenConvert.getNovalsDetail(novals)
    console.log('------------FINISH!!!--------------')
    return novals
  } catch (error) {
    console.log('------------CHERRIO FAILED ACTION!!!--------------')
    throw error
  }
}

const executeSummaryOnly = async () => {
  try {
    let novals = await crawlTruyenConvert.getNovalsSummaryInfo()
    console.log('------------FINISH!!!--------------')
    return novals
  } catch (error) {
    console.log('------------CHERRIO FAILED ACTION!!!--------------')
    throw error
  }
}

module.exports = {
  execute: executeCherrio,
  executeSummaryOnly
}
