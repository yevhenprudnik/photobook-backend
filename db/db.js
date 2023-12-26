import knex from 'knex';
import { log, error } from 'console';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from '../environment.js';

const db = knex({
  client: 'pg',
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  },
  pool: {
    max: 2,
    min: 1,
  },
  useNullAsDefault: true,
});

// Db health check
db.raw('SELECT 1')
  .then(() => {
    log('Database connected!');
  })
  .catch(e => {
    error('Error connecting to the database: ', e);
  });

export default db;
