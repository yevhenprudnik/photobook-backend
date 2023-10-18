import userRepository from '../../db/repositories/user.repository.js';

/** @type {import('../../index').Route} */
export default async server => {
  server.get('/', async (request, reply) => {
    return userRepository.find();
  });
};
