const baseUrl = 'http://localhost:8080';

/**
 * @param {string} path
 * @param {string} method
 * @param {object | null} [body]
 * @param {object} headers
 */
export const request = (path, method, body, headers = {}) => {
  /** @type {RequestInit} */
  const requestInit = {
    method,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    requestInit.body = JSON.stringify(body);
  }

  return fetch(baseUrl + path, requestInit);
};
