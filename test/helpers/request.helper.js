const baseUrl = 'http://localhost:8080';

/**
 * @param {string} path
 * @param {string} method
 * @param {{body?: any, headers?: any}} args
 */
export const request = async (path, method, args = {}) => {
  const { headers, body } = args;

  return fetch(baseUrl + path, {
    method,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
};
