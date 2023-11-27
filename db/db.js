import knex from 'knex';
import { DB_CONNECTION } from '../environment.js';

const db = knex({
  client: 'pg',
  connection: DB_CONNECTION,
});

console.log('Database connected.');

export default db;
