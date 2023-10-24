import test, { after, describe } from 'node:test';
import assert from 'node:assert';
import { request } from './helpers/request.helper.js';

describe('/auth test.', async () => {
  let user = {
    username: 'test_username',
    email: 'test_email@gmail.com',
    password: 'test_password',
  };

  /** @type {string} */
  let accessToken;
  /** @type {string} */
  let refreshToken;

  after(async () => {
    const res = await request('/user', 'DELETE', {
      headers: {
        authorization: `Bearer ${accessToken} ${refreshToken}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.deepStrictEqual(data, { affected: 1 });

    console.log(
      `Cleaned up testing environment: removed ${data.affected} test user.`
    );
  });

  test('Throw error if required fields are missing.', async t => {
    const res = await request('/auth/sign-up', 'POST', {
      body: { username: 'username', password: 'password' },
    });

    assert.strictEqual(res.status, 400);

    const data = await res.json();

    assert.strictEqual(
      data.message,
      "body must have required property 'email'"
    );
  });

  test('Throw error if email is wrong format.', async t => {
    const res = await request('/auth/sign-up', 'POST', {
      body: {
        username: 'username',
        email: 'invalid_email',
        password: 'password',
      },
    });

    assert.strictEqual(res.status, 400);

    const data = await res.json();

    assert.strictEqual(data.message, 'body/email must match format "email"');
  });

  test('Successfully sign up new user.', async t => {
    const res = await request('/auth/sign-up', 'POST', { body: user });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    accessToken = data.accessToken;
    refreshToken = data.refreshToken;

    assert.strictEqual(typeof data.accessToken, 'string');
    assert.strictEqual(typeof data.refreshToken, 'string');
  });

  test('Successfully sign in new user.', async t => {
    const res = await request('/auth/sign-in', 'POST', { body: user });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(typeof data.accessToken, 'string');
    assert.strictEqual(typeof data.refreshToken, 'string');
  });

  test('Throw error with wrong password.', async t => {
    const res = await request('/auth/sign-in', 'POST', {
      body: { ...user, password: 'wrong_password' },
    });

    assert.strictEqual(res.status, 400);

    const data = await res.json();

    assert.strictEqual(data.statusCode, 400);
    assert.strictEqual(data.message, 'Wrong credentials.');
  });

  test('Throw error with missing auth headers.', async t => {
    const res = await request('/auth', 'GET');

    assert.strictEqual(res.status, 400);

    const data = await res.json();

    assert.strictEqual(data.statusCode, 400);
    assert.strictEqual(data.message, 'No auth headers provided.');
  });

  test('Throw error with invalid auth headers.', async t => {
    const res = await request('/auth', 'GET', {
      headers: { authorization: 'Invalid auth headers.' },
    });

    assert.strictEqual(res.status, 400);

    const data = await res.json();

    assert.strictEqual(data.statusCode, 400);
    assert.strictEqual(data.message, 'Invalid auth headers.');
  });

  test('Successfully return user with valid tokens.', async t => {
    const res = await request('/auth', 'GET', {
      headers: { authorization: `Bearer ${accessToken} ${refreshToken}` },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(typeof data.id, 'number');
    assert.strictEqual(data.email, user.email);
    assert.strictEqual(data.username, user.username);
  });

  test('Successfully refresh user session.', async t => {
    const res = await request('/auth/session', 'GET', {
      headers: { authorization: `Bearer ${accessToken} ${refreshToken}` },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(typeof data.accessToken, 'string');
    assert.strictEqual(typeof data.refreshToken, 'string');
  });
});
