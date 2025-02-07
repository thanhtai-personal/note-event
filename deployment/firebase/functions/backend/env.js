const dotenv = require('dotenv')

dotenv.config();

module.exports =  {
  database_url: process.env.DATABASE_URL,
  test_database_url: process.env.TEST_DATABASE_URL,
  secret: process.env.SECRET,
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV,
  host: process.env.HOST_URL,
  jwtKey: process.env.JWT_KEY,
  saltPrefix: parseInt(process.env.SALT_PREFIX),
  prodDbConfig: {
    host: process.env.host,
    password: process.env.dbPassword,
    port: process.env.dbPort,
    database: process.env.dbName,
    user: process.env.dbUser
  }
}