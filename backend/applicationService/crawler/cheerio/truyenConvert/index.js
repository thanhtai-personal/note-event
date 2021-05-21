const cheerio = require('cheerio');
const got = require('got');
const URLS = require('./urls');
const REGS = require('./regs');
const { PAGE_PARAM, RETRY_TIME } = require('./constants');
let countError = 0
const getFilterMaxPage = (filterBody) => {
  try {
    let pageNumbers = [];
    filterBody('ul.pagination li a').each((i, link) => {
      pageNumbers = pageNumbers.concat((link.attribs.href.match(REGS.pageNumberStringReg) || [])
        .map((pageString) => {
          return parseInt(pageString.match(REGS.pageNumberReg)[0])
        }))
    })
    return Math.max(...pageNumbers)
  } catch (error) {
    throw (error)
  }
}

const getNovals = (htmlBody) => {
  try {
    const novals = []
    htmlBody('div.media div.media-body').each((i, mediaBody) => {
      const h4 = mediaBody.children[1] || {}
      let noval = {
        name: h4.children[0].attribs.title,
        url: h4.children[0].attribs.href,
        group: mediaBody.children[3].children[0].data,
        shortDes: mediaBody.children[5].children[0].data
      }
      novals.push(noval)
    })
    return novals
  } catch (error) {
    throw (error)
  }
}

const getNovalsSummaryInfo = async () => {
  try {
    const response = await got(URLS.filterDefaultPage);
    const filterBody = cheerio.load(response.body);
    const minPageFilter = 1;
    const maxPageFilter = getFilterMaxPage(filterBody);
    let novals = []
    // for (let i = minPageFilter; i <= maxPageFilter; i++) {
    for (let i = minPageFilter; i <= 5; i++) { // test 5 page
      const filterPageURL = URLS.filterWithPaging.replace(PAGE_PARAM, `${i}`)
      const response = await got(filterPageURL);
      const filterPageBody = cheerio.load(response.body);
      novals = novals.concat(getNovals(filterPageBody) || [])
    }
    return novals
  } catch (error) {
    throw error
  }
}

const getNovalChapters = async (originUrl, chapNumber, retryTime = 0) => {
  try {
    let chapter = {}
    const chapterURL = `${originUrl}chuong-${chapNumber}`
    chapter.url = chapterURL
    
    const response = await got(chapterURL);
    const filterBody = cheerio.load(response.body);
    
    const titleElem = filterBody('div.nh-read__title')
    titleElem.each((index, elem) => {
      chapter.title = elem.children[0].data
    })
    
    const contentElem = filterBody('div#js-read__content').html()
    chapter.content = contentElem.replace(REGS.adsTag, '').replace(REGS.scriptTag, '').replace(REGS.alertTag, '<br>')
    return chapter
  } catch (error) {
    const makeDelayTime = (delay) => {
      return new Promise(function (resolve) {
        setTimeout(resolve, delay);
      });
    }
    await makeDelayTime(1000)
    if (retryTime < RETRY_TIME) {
      return getNovalChapters(originUrl, chapNumber, retryTime + 1)
    } else {
      countError++
      console.log('failed crawl number: ', countError)
      console.log(`${originUrl}chuong-${chapNumber}`)
      return {
        url: `${originUrl}chuong-${chapNumber}`,
        content: 'get content Error!!!'
      }
    }
  }
}

const getNovalsDetail = async (novals) => {
  try {
    let novalRes = []
    for (nov of novals) {
      let noval = { ...nov }
      const response = await got(nov.url);
      const filterBody = cheerio.load(response.body);
      const fullDesEle = filterBody('div#nav-intro div.row div.col-8 div.mb-4 div.content p')
      fullDesEle.each((index, elem) => {
        noval.fullDes = elem.children[0].data
      })
      const chapNumber = filterBody('a#nav-tab-chap span.counter')
      chapNumber.each((index, elem) => {
        noval.chapNumber = parseInt(elem.children[0].data || 0)
      })
      let chapters = {}
      for (let i = 1; i <= noval.chapNumber; i++) {
        chapters[`${i}`] = getNovalChapters(noval.url, i)
      }
      noval.chapters = chapters
      novalRes.push(noval)
    }
  } catch (error) {
    throw (error)
  }
}

module.exports = {
  getNovalsSummaryInfo,
  getNovalsDetail
}