const express = require('express')
const conbineController = require('./controller')
const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
const authController = require('./controller/authenticate.controller')
const eventNoteController = require('./controller/eventNote.controller')
const adminController = require('./controller/admin.controller')
const novalManageController = require('./controller/novalManage.controller')
const crawlerController = require('./controller/crawler.controller')
const envConfig = require('./env')
const { useAuth } = require('./middlewares')
const cors = require('cors')

const app = express();
const getApp = () => app
var whitelist = ['https://tttgalaxy.co.uk', 'http://localhost']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
const middleWares = [
  express.urlencoded({ extended: true }),
  express.json(),
  // bodyParser.urlencoded({ extended: true }),
  cookieParser(),
  cors(corsOptionsDelegate),
  useAuth
]
middleWares.forEach((middleWare) => app.use(middleWare))

const controllerToBeCompined = [authController, eventNoteController, adminController, novalManageController, crawlerController]
controllerToBeCompined.forEach((controller) => conbineController(getApp, controller))

// Start the server
const PORT = envConfig.port;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});