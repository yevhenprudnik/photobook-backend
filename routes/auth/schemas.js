export const signUp = /** @type {const} */ ({
  tags: ['auth'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      username: { type: 'string', minLength: 5 },
      password: { type: 'string', minLength: 5 },
    },
    required: ['email', 'username', 'password'],
  },
});

export const signIn = /** @type {const} */ ({
  tags: ['auth'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 5 },
    },
    required: ['email', 'password'],
  },
});

export const authHeadersSchema = {
  type: 'object',
  properties: {
    authorization: {
      type: 'string',
    },
  },
  required: ['authorization'],
};

export const getCurrentUser = /** @type {const} */ ({
  tags: ['auth'],
  headers: authHeadersSchema,
});

export const refreshSession = /** @type {const} */ ({
  tags: ['auth'],
  headers: authHeadersSchema,
});
