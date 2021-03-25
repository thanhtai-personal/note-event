import dbConfig from '../env'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(dbConfig.database_url)

export const testConnect = () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default sequelize