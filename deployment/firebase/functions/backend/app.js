const express = require('express')
const conbineController = require('./controller')
const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
const authController = require('./controller/authenticate.controller')
const eventNoteController = require('./controller/eventNote.controller')
const adminController = require('./controller/admin.controller')
const novalManageController = require('./controller/novalManage.controller')
const crawlerController = require('./controller/crawler.controller')
const { useAuth } = require('./middlewares')
const cors = require('cors')

const app = express();
const getApp = () => app
const whitelist = ['https://tttgalaxy.co.uk', 'http://localhost:3000']
const middleWares = [
  express.urlencoded({ extended: true }),
  express.json(),
  // bodyParser.urlencoded({ extended: true }),
  cookieParser(),
  cors({
    origin: whitelist
  }),
  useAuth
]
middleWares.forEach((middleWare) => app.use(middleWare))

const controllerToBeCompined = [authController, eventNoteController, adminController, novalManageController, crawlerController]
controllerToBeCompined.forEach((controller) => conbineController(getApp, controller))

module.exports = getApp
