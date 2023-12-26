import { authHeadersSchema } from '../auth/schemas.js';

export const getPhotobook = /** @type {const} */ ({
  tags: ['photobook'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
});

export const getPhotobooks = /** @type {const} */ ({
  tags: ['photobook'],
  headers: authHeadersSchema,
});

export const createPhotobook = /** @type {const} */ ({
  tags: ['photobook'],
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
  tags: ['photobook'],
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
  tags: ['photobook'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  headers: authHeadersSchema,
});
