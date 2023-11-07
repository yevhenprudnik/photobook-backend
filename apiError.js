/**
 * @extends {Error}
 */
export class ApiError extends Error {
  /**
   * @param {number} code
   * @param {string} message
   */
  constructor(code, message) {
    super(message);
    this.statusCode = code;
  }
}

const badRequest = (message = 'Bad Request') => {
  throw new ApiError(400, message);
};

const unauthorized = (message = 'Unauthorized') => {
  throw new ApiError(401, message);
};

const forbidden = (message = 'Forbidden') => {
  throw new ApiError(403, message);
};

const notFound = (message = 'Not Found') => {
  throw new ApiError(404, message);
};

export default {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
};
