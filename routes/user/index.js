import userRepository from '../../db/repositories/user/user.repository.js';
import { validateByToken } from '../../hooks/auth.hook.js';
import { getUser } from '../../services/user.cache.service.js';

/** @type {import('../../index').Route} */
export default async server => {
  server.get('/', async (request, reply) => {
    return userRepository.find();
  });

  server.delete(
    '/',
    { preHandler: validateByToken('access') },
    async (request, reply) => {
      const user = getUser(request);

      return userRepository.remove({ id: user.id });
    },
  );
};
