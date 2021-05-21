const crawlTruyenConvert = require('./truyenConvert')

const excuteCherrio = async () => {
  let novals = await crawlTruyenConvert.getNovalsSummaryInfo()
  novals = await crawlTruyenConvert.getNovalsDetail(novals)
  console.log('------------FINISH!!!--------------')
}

module.exports = {
  excute: excuteCherrio
}
