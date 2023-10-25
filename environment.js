import * as env from 'dotenv';
env.config({ path: './.env' });

export const HOST = process.env.HOST || '0.0.0.0';
export const PORT = process.env.PORT || 8080;
export const BASE_URL = process.env.BASE_URL;
// database connection
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_NAME = process.env.DB_NAME;
export const DB_PASS = process.env.DB_PASS;
// jsonwebtoken
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'secret';
