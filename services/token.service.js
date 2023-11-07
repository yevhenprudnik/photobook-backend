import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../environment.js';

/**
 * @param {any}  payload
 * @param {string}  secret
 * @param {import("jsonwebtoken").SignOptions}  options
 * @returns {string}
 */
const generate = (payload, secret, options = {}) => {
  return jwt.sign(payload, secret, options);
};

/**
 * @param {string}  token
 * @param {string}  secret
 * @returns {any}
 */
const verify = (token, secret) => {
  return jwt.verify(token, secret);
};

/**
 * @param {{ id: number }}  payload
 * @returns {string}
 */
const generateAccess = payload => {
  return generate(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' });
};

/**
 * @param {{ id: number }}  payload
 * @returns {string}
 */
const generateRefresh = payload => {
  return generate(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });
};

/**
 * @param {string}  token
 */
const verifyAccess = token => {
  return verify(token, JWT_ACCESS_SECRET);
};

/**
 * @param {string} token
 */
const verifyRefresh = token => {
  return verify(token, JWT_REFRESH_SECRET);
};

export default {
  generateAccess,
  generateRefresh,
  verifyAccess,
  verifyRefresh,
};
