import { authHeadersSchema } from '../auth/schemas.js';

export const getPage = /** @type {const} */ ({
  tags: ['page'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
});

export const createPage = /** @type {const} */ ({
  tags: ['page'],
  body: {
    type: 'object',
    properties: {
      position: { type: 'number' },
      photobookId: { type: 'number' },
      templateId: { type: 'number' },
      type: {
        type: 'string',
        enum: ['default', 'cover'],
      },
      replacements: {
        type: 'object',
        additionalProperties: { type: 'string' },
      },
    },
    required: ['position', 'photobookId', 'templateId', 'type', 'replacements'],
  },
  headers: authHeadersSchema,
});

export const updatePage = /** @type {const} */ ({
  tags: ['page'],
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
      position: { type: 'number' },
      photobookId: { type: 'number' },
      templateId: { type: 'number' },
      type: {
        type: 'string',
        enum: ['default', 'cover'],
      },
      replacements: {
        type: 'object',
        additionalProperties: { type: 'string' },
      },
    },
  },
  headers: authHeadersSchema,
});

export const delatePage = /** @type {const} */ ({
  tags: ['page'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  headers: authHeadersSchema,
});

export const getPages = /** @type {const} */ ({
  tags: ['page'],
  headers: authHeadersSchema,
});
