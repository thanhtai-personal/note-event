//database/dev/pool.js

const { Pool } = require('pg')

const env = require('./../../env')

const databaseConfig = { connectionString: env.database_url };
const pool = new Pool(databaseConfig);

module.exports =  pool;