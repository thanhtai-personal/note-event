const { PAGE_PARAM } = require('./constants')

module.exports = {
  filterDefaultPage: `https://truyencv.com/loc-truyen/?selAttr=0&selComplete=0&selNum=0&selTime=0&selOrder=4&btnFilter=1`,
  filterWithPaging: `https://truyencv.com/loc-truyen/trang-${PAGE_PARAM}/?selAttr=0&selComplete=0&selNum=0&selTime=0&selOrder=4&btnFilter=1`
}