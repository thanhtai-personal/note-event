const crawlTruyenConvert = require('./truyenConvert')

const excuteCherrio = async () => {
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

module.exports = {
  excute: excuteCherrio
}
