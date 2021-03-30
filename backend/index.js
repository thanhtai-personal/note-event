const express = require('express')
const conbineController = require('./controller')
const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
const authController = require('./controller/authenticate.controller')
const envConfig = require('./env')

const app = express();
const getApp = () => app

const middleWares = [
  express.urlencoded({ extended: true }),
  express.json(),
  // bodyParser.urlencoded({ extended: true }),
  cookieParser()
]
middleWares.forEach((middleWare) => app.use(middleWare))

const controllerToBeCompined = [authController]
controllerToBeCompined.forEach((controller) => conbineController(getApp, controller))

// Start the server
const PORT = envConfig.port;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});