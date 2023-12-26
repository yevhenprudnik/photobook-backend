import userRepository from '../../db/repositories/user/user.repository.js';
import { validateByToken } from '../../hooks/auth.hook.js';
import { user } from './schemas.js';

/** @type {import('../../index').Route} */
export default async (server) => {
  server.get('/', { schema: user }, async (request, reply) => {
    return userRepository.find();
  });

  server.delete(
    '/',
    { schema: user, preHandler: validateByToken('access') },
    async (request, reply) => {
      return userRepository.remove({ id: request.user.id });
    },
  );
};
