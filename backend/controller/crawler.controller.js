const { routeType } = require('./../constants')
const CrawlerService = require('../applicationService/crawler.service')
const novalService = require('../domainService/noval.service')
const chapterService = require('../domainService/chapter.service')
const {
  CRAWL_FULL_SITE,
  CRAWL_CHAPTER,
  CRAWL_NOVAL,
  CRAWL_ALL_NEW_CHAPTER,
  CRAWL_SUMMARY
} = require('./routePaths')

const crawlerService = CrawlerService(novalService, chapterService)

const crawlFullSite = async (req, res) => {
  try {
    const reqData = {
      ...req
    }
    const responseData = await crawlerService.crawlFullSite(reqData)
    res.status(200).send(responseData)
  } catch (error) {
    res.status(500).send(error)
  }
}

const crawlNoval = async (req, res) => {
  try {
    const reqData = {
      ...req
    }
    const responseData = await crawlerService.crawlNoval(reqData)
    res.status(200).send(responseData)
  } catch (error) {
    res.status(500).send(error)
  }
}

const crawlChapter = async (req, res) => {
  try {
    const reqData = {
      ...req
    }
    const responseData = await crawlerService.crawlChapter(reqData)
    res.status(200).send(responseData)
  } catch (error) {
    res.status(500).send(error)
  }
}

const crawlAllNewChapter = async (req, res) => {
  try {
    const reqData = {
      ...req
    }
    const responseData = await crawlerService.crawlAllNewChapter(reqData)
    res.status(200).send(responseData)
  } catch (error) {
    res.status(500).send(error)
  }
}

const crawlerSummary = async (req, res) => {
  try {
    const reqData = {
      ...req
    }
    const responseData = await crawlerService.crawlerSummary(reqData)
    res.status(200).send(responseData)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports =  [
  {
    controllerExecution: crawlFullSite,
    path: CRAWL_FULL_SITE,
    method: routeType.POST
  },
  {
    controllerExecution: crawlNoval,
    path: CRAWL_NOVAL,
    method: routeType.POST
  },
  {
    controllerExecution: crawlChapter,
    path: CRAWL_CHAPTER,
    method: routeType.POST
  },
  {
    controllerExecution: crawlAllNewChapter,
    path: CRAWL_ALL_NEW_CHAPTER,
    method: routeType.POST
  },
  {
    controllerExecution: crawlerSummary,
    path: CRAWL_SUMMARY,
    method: routeType.POST
  },
]