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
});

console.log('Database connected.');

export default db;
