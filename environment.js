import * as env from 'dotenv';
env.config({ path: './.env' });

export const HOST = process.env.HOST || '0.0.0.0';
export const PORT = process.env.PORT || 8080;
