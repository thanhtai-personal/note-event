const dbConfig = require('../env')
const { Sequelize } = require('sequelize')

let sequelize = new Sequelize(dbConfig.database_url)

if (process.env.NODE_ENV === 'production') {
  const config = dbConfig.prodDbConfig
  sequelize = new Sequelize(config.database,
    config.user,
    config.password,
    {
        port: config.port,
        host: config.host,
        dialect: 'postgres',
        dialectOptions: { ssl: { rejectUnauthorized: false } },
        logging: console.log,
        define: {
            timestamps: false
        }    
    })
}

const testConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// testConnect()

module.exports = {
  testConnect,
  sequelize
}