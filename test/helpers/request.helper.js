import { BASE_URL } from '../../environment.js';

/**
 * @param {string} path
 * @param {string} method
 * @param {{ body?: any, headers?: any }} args
 */
export const request = async (path, method, args = {}) => {
  const { headers, body } = args;

  return fetch(BASE_URL + path, {
    method,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
};
