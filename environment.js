import * as env from 'dotenv';

env.config({ path: './.env' });

export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || 3000;
export const PROTOCOL = process.env.PROTOCOL || 'http';
// database connection
export const DB_CONNECTION = process.env.DB_CONNECTION || '';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || '5432';
export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_NAME = process.env.DB_NAME || 'postgres';
export const DB_PASS = process.env.DB_PASS || 'postgres';
// jsonwebtoken
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'secret';
// stripe
export const STRIPE_TOKEN = process.env.STRIPE_TOKEN || 'stripe';
// test
export const TEST_ACCESS_TOKEN = process.env.TEST_ACCESS_TOKEN || 'token';
