import { getCurrentUser, signUp, signIn, refreshSession } from './schemas.js';
import { validateByToken } from '../../hooks/auth.hook.js';
import userRepository from '../../db/repositories/user/user.repository.js';
import tokenService from '../../services/token.service.js';
import { hash, compare } from '../../services/crypto.service.js';
import apiError from '../../apiError.js';
import { getUser } from '../../services/user.cache.service.js';

/** @type {import('../../index').Route} */
export default async server => {
  server.get(
    '/',
    { schema: getCurrentUser, preHandler: validateByToken('access') },
    async (request, reply) => {
      return getUser(request);
    }
  );

  server.post('/sign-up', { schema: signUp }, async (request, reply) => {
    const candidate = await userRepository.findOne({
      email: request.body.email,
    });

    if (candidate) {
      throw apiError.badRequest('Email already taken.');
    }

    const userId = await userRepository.create({
      ...request.body,
      password: hash(request.body.password),
    });

    return {
      accessToken: tokenService.generateAccess({ id: userId }),
      refreshToken: tokenService.generateRefresh({ id: userId }),
    };
  });

  server.post('/sign-in', { schema: signIn }, async (request, reply) => {
    const { email, password } = request.body;

    const candidate = await userRepository.findOne({ email });

    if (!candidate) {
      throw apiError.notFound('User not found.');
    }

    const validPassword = compare(password, candidate.password);

    if (!validPassword) {
      throw apiError.badRequest('Wrong credentials.');
    }

    return {
      accessToken: tokenService.generateAccess({ id: candidate.id }),
      refreshToken: tokenService.generateRefresh({ id: candidate.id }),
    };
  });

  server.get(
    '/session',
    { schema: refreshSession, preHandler: validateByToken('refresh') },
    async (request, reply) => {
      const user = getUser(request);

      return {
        accessToken: tokenService.generateAccess({ id: user.id }),
        refreshToken: tokenService.generateRefresh({ id: user.id }),
      };
    }
  );
};
