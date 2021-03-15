import express from 'express'
import combineAppRoutes from './routes'
import authRoutes from './src/auth/controllers'

const app = express();
const getApp = () => app

const middleWares = []
middleWares.forEach((middleWare) => app.use(middleWare))

const controllerToBeCompined = [authRoutes]
controllerToBeCompined.forEach((featureRoutes) => combineAppRoutes(getApp, featureRoutes))

// Start the server
const PORT = process.env.PORT || 2021;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});