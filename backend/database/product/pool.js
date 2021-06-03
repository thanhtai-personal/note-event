//database/dev/pool.js

const { Pool } = require('pg')

const env = require('./../../env')

const databaseConfig = { ...env.prodDbConfig
  , ssl: { rejectUnauthorized: false }};
const pool = new Pool(databaseConfig);

module.exports =  pool;