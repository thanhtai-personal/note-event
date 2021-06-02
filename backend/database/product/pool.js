//database/dev/pool.js

const { Pool } = require('pg')

const env = require('./../../product.env')

const databaseConfig = { connectionString: env.database_url
  , ssl: { rejectUnauthorized: false }};
const pool = new Pool(databaseConfig);

module.exports =  pool;