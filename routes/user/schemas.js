import { authHeadersSchema } from '../auth/schemas.js';

export const user = /** @type {const} */ ({
  tags: ['user'],
  headers: authHeadersSchema,
});