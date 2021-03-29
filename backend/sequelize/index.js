const dbConfig = require('../env')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(dbConfig.database_url)

module.exports = {
  testConnect: async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  },
  sequelize
}