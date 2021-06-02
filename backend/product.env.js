const dotenv = require('dotenv')

dotenv.config();

module.exports =  {
  database_url: process.env.URI,
  secret: process.env.SECRET,
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV,
  host: process.env.HOST_URL,
  jwtKey: process.env.JWT_KEY,
  saltPrefix: parseInt(process.env.SALT_PREFIX),
}