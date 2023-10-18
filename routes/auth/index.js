import { signUp, signIn } from './schemas.js';
import { authHook } from '../../hooks/auth.hook.js';
import userRepository from '../../db/repositories/user.repository.js';
import tokenService from '../../services/token.service.js';
import { hash, compare } from '../../services/crypto.service.js';
import apiError from '../../apiError.js';

/** @type {import('../../index').Route} */
export default async server => {
  server.get('/', { preHandler: authHook }, async (request, reply) => {
    return Reflect.get(request, 'user');
  });

  server.post('/sign-up', { schema: signUp }, async (request, reply) => {
    const candidate = await userRepository.findOne({
      email: request.body.email,
    });

    if (candidate) {
      throw apiError.badRequest('Email already taken.');
    }

    const user = await userRepository.create({
      ...request.body,
      password: hash(request.body.password),
    });

    return {
      accessToken: tokenService.generateAccess({ id: user.id }),
      refreshToken: tokenService.generateRefresh({ id: user.id }),
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

  server.get('/session', { preHandler: authHook }, async (request, reply) => {
    const user = Reflect.get(request, 'user');

    return {
      accessToken: tokenService.generateAccess({ id: user.id }),
      refreshToken: tokenService.generateRefresh({ id: user.id }),
    };
  });
};
