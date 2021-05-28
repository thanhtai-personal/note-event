const cheerio = require('cheerio');
const got = require('got');
const URLS = require('./urls');
const REGS = require('./regs');
const { PAGE_PARAM, RETRY_TIME, DELAY_TIME } = require('./constants');

const { blockScrapPages } = URLS

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
    throw { error, filterBody }
  }
}

const getNovals = (htmlBody) => {
  try {
    const novals = []
    htmlBody('div.media').each((i, media) => {
      const mediaLeft = media.children[1]
      const mediaBody = media.children[3]
      const h4 = mediaBody.children[1] || {}
      let noval = {
        name: h4.children[0].attribs.title,
        url: h4.children[0].attribs.href,
        group: mediaBody.children[3].children[0].data,
        shortDescription: mediaBody.children[5].children[0].data,
        imageUrl: mediaLeft.children[1].children[1].attribs.src,
        imageAltName: mediaLeft.children[1].children[1].attribs.alt
      }
      novals.push(noval)
    })
    return novals
  } catch (error) {
    throw { error, htmlBody }
  }
}

const getNovalsSummaryInfo = async () => {
  try {
    console.log('=GET NOVALS SUMMARY INFO')
    const response = await got(URLS.filterDefaultPage);
    const filterBody = cheerio.load(response.body);
    const minPageFilter = 1;
    const maxPageFilter = getFilterMaxPage(filterBody);
    let novals = []
    // for (let i = minPageFilter; i <= maxPageFilter; i++) {
    for (let i = minPageFilter; i <= 1; i++) { // test 1 page
      const filterPageURL = URLS.filterWithPaging.replace(PAGE_PARAM, `${i}`)
      const response = await got(filterPageURL);
      const filterPageBody = cheerio.load(response.body);
      novals = novals.concat(getNovals(filterPageBody) || [])
    }
    console.log('=GET NOVALS SUMMARY INFO SUCCESS')
    return novals
  } catch (error) {
    console.log('=GET NOVALS SUMMARY FAILED')
    throw { error }
  }
}

const getNovalChapter = async (originUrl, chapNumber, retryTime = 0) => {
  try {
    console.log('====process noval chapter', originUrl, chapNumber)
    let chapter = {}
    const chapterURL = chapNumber < 0 ? originUrl : `${originUrl}chuong-${chapNumber}`
    chapter.url = chapterURL

    const response = await got(chapterURL);
    const filterBody = cheerio.load(response.body);

    const titleElem = filterBody('div.nh-read__title')
    titleElem.each((index, elem) => {
      chapter.title = elem.children[0].data
    })

    const contentElem = filterBody('div#js-read__content').html()
    chapter.content = contentElem.replace(REGS.adsTag, '').replace(REGS.scriptTag, '').replace(REGS.alertTag, '<br>')
    chapter.isCrawledSuccess = true
    console.log('====process noval chapter success', originUrl, chapNumber)
    return chapter
  } catch (error) {
    const makeDelayTime = (delay) => {
      return new Promise(function (resolve) {
        setTimeout(resolve, delay);
      });
    }
    await makeDelayTime(DELAY_TIME)
    if (retryTime < RETRY_TIME) {
      console.log('====process noval chapter failed', originUrl, chapNumber)
      return await getNovalChapter(originUrl, chapNumber, retryTime + 1)
    } else {
      countError++
      console.log('--retry get chapter ', countError)
      console.log(`${originUrl}chuong-${chapNumber}`)
      return {
        url: `${originUrl}chuong-${chapNumber}`,
        isCrawledSuccess: false
      }
    }
  }
}

const getNovalsDetail = async (novals) => {
  try {
    let novalRes = []
    for (nov of novals) {
      console.log('==process noval', nov.url)
      let noval = { ...nov }
      if (blockScrapPages.includes(noval.url)) {
        noval.isBlockedScrap = true
        novalRes.push(noval)
        console.log('==blocked scrap noval', nov.url)
        continue
      }
      let response
      try {
        response = await got(nov.url);
      } catch (error) {
        noval.isBlockedScrap = true
        novalRes.push(noval)
        console.log('==failed get noval (may blocked)', nov.url)
        continue
      }
      const filterBody = cheerio.load(response.body);
      const fullDesEle = filterBody('div#nav-intro div.row div.col-8 div.mb-4 div.content p')
      fullDesEle.each((index, elem) => {
        noval.intro = elem.children[0].data
      })
      const chapNumber = filterBody('a#nav-tab-chap span.counter')
      chapNumber.each((index, elem) => {
        noval.chapNumber = parseInt(elem.children[0].data || 0)
      })
      let chapters = []
      // for (let i = 1; i <= noval.chapNumber; i++) {
      for (let i = 1; i <= 5; i++) { // test 5 chap
        chapters[i-1] = await getNovalChapter(noval.url, i)
      }
      noval.chapters = chapters
      novalRes.push(noval)
      console.log('==process noval success', nov.url)
    }
    return novalRes
  } catch (error) {
    console.log('==process noval failed', nov.url)
    throw { error, novals }
  }
}

module.exports = {
  getNovalsSummaryInfo,
  getNovalsDetail,
  getNovalChapter,
  getNovalDetail: () => {}
}