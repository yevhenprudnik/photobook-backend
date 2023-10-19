import userRepository from '../db/repositories/user.repository.js';
import apiError, { ApiError } from '../apiError.js';
import tokenService from '../services/token.service.js';

/** @param {'access'|'refresh'} tokenType */
export const validateSession =
  tokenType =>
  /** @type {import('fastify').preHandlerHookHandler} */
  async (request, reply) => {
    try {
      const authHeaders = request.headers.authorization;

      if (!authHeaders) {
        throw apiError.badRequest('No auth headers provided.');
      }

      const [bearer, accessToken, refreshToken] = authHeaders.split(' ');

      if (bearer !== 'Bearer' || (!accessToken && !refreshToken)) {
        throw apiError.badRequest('Invalid auth headers.');
      }

      let payload;

      if (tokenType === 'access') {
        payload = tokenService.verifyAccess(accessToken);
      } else if (tokenType === 'refresh') {
        payload = tokenService.verifyRefresh(refreshToken);
      } else {
        throw apiError.badRequest('Invalid token type.');
      }

      const user = await userRepository.findOne({ id: payload.id });

      if (!user) {
        throw apiError.notFound('User not found.');
      }

      Reflect.set(request, 'user', user);
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      }

      throw apiError.unauthorized();
    }
  };
