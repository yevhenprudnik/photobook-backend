import { authHeadersSchema } from '../auth/schemas.js';

export const createOrder = /** @type {const} */ ({
  tags: ['order'],
  body: {
    type: 'object',
    properties: {
      photobookId: { type: 'number' },
      trackingNumber: { type: 'string' },
    },
    required: ['photobookId', 'trackingNumber'],
  },
  headers: authHeadersSchema,
});

export const submitOrder = /** @type {const} */ ({
  tags: ['order'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  headers: authHeadersSchema,
});

export const getOrders = /** @type {const} */ ({
  tags: ['order'],
  headers: authHeadersSchema,
});
