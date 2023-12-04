import { authHeadersSchema } from '../auth/schemas.js';

export const getTemplate = /** @type {const} */ ({
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
});

export const createTemplate = /** @type {const} */ ({
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 5, maxLength: 50 },
      html: {
        type: 'string',
        pattern: '<!DOCTYPE.*>|<[^>]+>',
      },
      requiredFields: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    required: ['name', 'html'],
  },
  headers: authHeadersSchema,
});

export const updateTemplate = /** @type {const} */ ({
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 5, maxLength: 50 },
      html: { type: 'string', pattern: '<!DOCTYPE.*>|<[^>]+>' },
      requiredFields: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },
  headers: authHeadersSchema,
});

export const delateTemplate = /** @type {const} */ ({
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  headers: authHeadersSchema,
});
