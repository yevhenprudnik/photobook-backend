import apiError from '../../apiError.js';
import templateRepository from '../../db/repositories/template/template.repository.js';
import { validateByToken } from '../../hooks/auth.hook.js';
import {
  createTemplate,
  updateTemplate,
  delateTemplate,
  getTemplate,
  getTemplates,
} from './schemas.js';

/** @type {import('../../index').Route} */
export default async (server) => {
  server.get('/', { schema: getTemplates }, async (request, reply) => {
    return templateRepository.find();
  });

  server.get('/:id', { schema: getTemplate }, async (request, reply) => {
    return templateRepository.findOne({ id: request.params.id });
  });

  server.post(
    '/',
    { schema: createTemplate, preHandler: validateByToken('access') },
    async (request, reply) => {
      return templateRepository.create(request.body);
    },
  );

  server.post(
    '/:id',
    { schema: updateTemplate, preHandler: validateByToken('access') },
    async (request, reply) => {
      const { id } = request.params;

      const template = await templateRepository.findOne({ id });

      if (!template) {
        throw apiError.notFound('Template not found.');
      }

      return templateRepository.update(request.params.id, request.body);
    },
  );

  server.delete(
    '/:id',
    { schema: delateTemplate, preHandler: validateByToken('access') },
    async (request, reply) => {
      const { id } = request.params;

      const template = await templateRepository.findOne({ id });

      if (!template) {
        throw apiError.notFound('Template not found.');
      }

      return templateRepository.remove({ id });
    },
  );
};
