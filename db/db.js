import knex from 'knex';
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
    max: 5,
    min: 1,
  },
});

// Db health check
db.raw('SELECT 1')
  .then(() => {
    console.log('Database connected!');
  })
  .catch(error => {
    console.error('Error connecting to the database: ', error);
  });

export default db;
