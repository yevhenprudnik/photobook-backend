import apiError from '../../apiError.js';
import photobookRepository from '../../db/repositories/photobook/photobook.repository.js';
import { validateByToken } from '../../hooks/auth.hook.js';
import {
  getPhotobook,
  createPhotobook,
  updatePhotobook,
  delatePhotobook,
  getPhotobooks,
} from './schemas.js';

/** @type {import('../../index').Route} */
export default async (server) => {
  server.get('/', { schema: getPhotobooks }, async (request, reply) =>
    photobookRepository.find(),
  );

  server.get('/:id', { schema: getPhotobook }, async (request, reply) =>
    photobookRepository.findOne({ id: request.params.id }),
  );

  server.post(
    '/',
    { schema: createPhotobook, preHandler: validateByToken('access') },
    async (request, reply) =>
      photobookRepository.create({
        ...request.body,
        userId: request.user.id,
      }),
  );

  server.post(
    '/:id',
    { schema: updatePhotobook, preHandler: validateByToken('access') },
    async (request, reply) => {
      const { id } = request.params;

      const photobook = await photobookRepository.findOne({ id });

      if (!photobook) {
        throw apiError.notFound('Photobook not found.');
      }

      if (photobook.userId !== request.user.id) {
        throw apiError.forbidden('You have no access to this photobook.');
      }

      return photobookRepository.update(request.params.id, request.body);
    },
  );

  server.delete(
    '/:id',
    { schema: delatePhotobook, preHandler: validateByToken('access') },
    async (request, reply) => {
      const { id } = request.params;

      const photobook = await photobookRepository.findOne({ id });

      if (!photobook) {
        throw apiError.notFound('Photobook not found.');
      }

      if (photobook.userId !== request.user.id) {
        throw apiError.forbidden('You have no access to this photobook.');
      }

      return photobookRepository.remove({ id });
    },
  );
};
