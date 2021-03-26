import express from 'express'
import conbineController from './controller'
import cookieParser from'cookie-parser'
// import bodyParser from 'body-parser'
import authController from './controller/authenticate.controller'
import envConfig from './env'

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

/**
 * 
 const crypto = require('crypto');

  const getHashedPassword = (password) => {
      const sha256 = crypto.createHash('sha256');
      const hash = sha256.update(password).digest('base64');
      return hash;
  }
 */