import { authHeadersSchema } from '../auth/schemas.js';

export const getPhotobook = /** @type {const} */ ({
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
});

export const createPhotobook = /** @type {const} */ ({
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 5,
        maxLength: 50,
      },
    },
    required: ['name'],
  },
  headers: authHeadersSchema,
});

export const updatePhotobook = /** @type {const} */ ({
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
      name: {
        type: 'string',
        minLength: 5,
        maxLength: 50,
      },
    },
  },
  headers: authHeadersSchema,
});

export const delatePhotobook = /** @type {const} */ ({
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  headers: authHeadersSchema,
});
