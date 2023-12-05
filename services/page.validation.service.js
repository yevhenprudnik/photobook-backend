import templateRepository from '../db/repositories/template/template.repository.js';
import apiError from '../apiError.js';
import photobookRepository from '../db/repositories/photobook/photobook.repository.js';

/**
 * @param {import('./user.cache.service.js').User} user
 * @param {Partial<import("../db/repositories/page/types").Page>} newPage
 * @param {import("../db/repositories/page/types").Page=} currentPage
 * @returns {Promise<void | Error>}
 */
export const validatePage = async (user, newPage, currentPage) => {
  const photobookId = newPage.photobookId || currentPage?.photobookId;
  const templateId = newPage.templateId || currentPage?.templateId;
  const replacements = newPage.replacements || currentPage?.replacements;

  const photobook = await photobookRepository.findOne({ id: photobookId });

  if (!photobook) {
    throw apiError.notFound('No photobook with such id.');
  }

  if (photobook.userId !== user.id) {
    throw apiError.forbidden(
      'You are not allowed to add pages to this photobook.',
    );
  }

  const template = await templateRepository.findOne({ id: templateId });

  if (!template) {
    throw apiError.notFound('No template with such id.');
  }

  template.requiredReplacements.forEach(field => {
    if (!replacements?.[field]) {
      throw apiError.badRequest(`Missing '${field}' required field.`);
    }
  });
};
