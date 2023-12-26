import apiError from '../../apiError.js';
import pageRepository from '../../db/repositories/page/page.repository.js';
import { validateByToken } from '../../hooks/auth.hook.js';
import { validatePage } from '../../services/page.validation.service.js';
import {
  createPage,
  updatePage,
  delatePage,
  getPage,
  getPages,
} from './schemas.js';

/** @type {import('../../index').Route} */
export default async (server) => {
  server.get('/', { schema: getPages }, async (request, reply) => {
    return pageRepository.find();
  });

  server.get('/:id', { schema: getPage }, async (request, reply) => {
    return pageRepository.findOne({ id: request.params.id });
  });

  server.post(
    '/',
    { schema: createPage, preHandler: validateByToken('access') },
    async (request, reply) => {
      await validatePage(request.user, request.body);

      return pageRepository.create(request.body);
    },
  );

  server.post(
    '/:id',
    { schema: updatePage, preHandler: validateByToken('access') },
    async (request, reply) => {
      const { id } = request.params;

      const page = await pageRepository.findOne({ id });

      if (!page) {
        throw apiError.notFound('Page not found.');
      }

      await validatePage(request.user, request.body, page);

      return pageRepository.update(request.params.id, request.body);
    },
  );

  server.delete(
    '/:id',
    { schema: delatePage, preHandler: validateByToken('access') },
    async (request, reply) => {
      const { id } = request.params;

      const page = await pageRepository.findOne({ id });

      if (!page) {
        throw apiError.notFound('Page not found.');
      }

      return pageRepository.remove({ id });
    },
  );
};
