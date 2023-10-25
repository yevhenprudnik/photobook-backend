import userRepository from '../../db/repositories/user.repository.js';
import { validateByToken } from '../../hooks/auth.hook.js';

/** @type {import('../../index').Route} */
export default async server => {
  server.get('/', async (request, reply) => {
    return userRepository.find();
  });

  server.delete(
    '/',
    { preHandler: validateByToken('access') },
    async (request, reply) => {
      const user = Reflect.get(request, 'user');

      return userRepository.remove({ id: user.id });
    }
  );
};
