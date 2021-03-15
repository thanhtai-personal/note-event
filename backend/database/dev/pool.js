//database/dev/pool.js

import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = { connectionString: process.env.DEV_DATABASE_URL };
const pool = new Pool(databaseConfig);

export default pool;