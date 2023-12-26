import { PROTOCOL, HOST, PORT } from '../../environment.js';

/**
 * @param {string} path
 * @param {string} method
 * @param {{ body?: any, headers?: any }} args
 */
export const request = async (path, method, args = {}) => {
  const { headers, body } = args;

  return fetch(`${PROTOCOL}://${HOST}:${PORT}${path}`, {
    method,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
};
