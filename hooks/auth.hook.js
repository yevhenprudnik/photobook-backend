import userRepository from '../db/repositories/user.repository.js';
import tokenService from '../services/token.service.js';

/** @type {import('fastify').preHandlerHookHandler} */
export const authHook = async (request, reply) => {
  const accessToken = request.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    throw Error('No token provided.');
  }

  const payload = tokenService.verifyAccess(accessToken);

  const user = await userRepository.findOne({ id: payload.id });

  if (!user) {
    throw Error('Unauthorized.');
  }

  Reflect.set(request, 'user', user);
};
