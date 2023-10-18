import userRepository from '../db/repositories/user.repository.js';
import apiError, { ApiError } from '../apiError.js';
import tokenService from '../services/token.service.js';

/** @type {import('fastify').preHandlerHookHandler} */
export const authHook = async (request, reply) => {
  try {
    const accessToken = request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      throw apiError.badRequest('No token provided.');
    }

    const payload = tokenService.verifyAccess(accessToken);

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
