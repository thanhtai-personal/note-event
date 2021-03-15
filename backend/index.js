const express = require('express');
const combineAppRoutes = require('./routes')
const authRoutes = require('./src/auth/routes')

const app = express();

const getApp = () => app
combineAppRoutes(getApp, authRoutes)

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});