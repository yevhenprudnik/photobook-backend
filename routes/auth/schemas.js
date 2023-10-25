export const signUp = /** @type {const} */ ({
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
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 5 },
    },
    required: ['email', 'password'],
  },
});

const authHeadersSchema = {
  type: 'object',
  properties: {
    authorization: {
      type: 'string',
    },
  },
  required: ['authorization'],
};

export const getCurrentUser = /** @type {const} */ ({
  headers: authHeadersSchema,
});

export const refreshSession = /** @type {const} */ ({
  headers: authHeadersSchema,
});
