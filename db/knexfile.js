import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from '../environment';

export default {
  development: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
    },
  },
};
