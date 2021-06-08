const getApp = require('./app')
const envConfig = require('./env')

const app = getApp()
// Start the server
const PORT = envConfig.port;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
