import test, { describe } from 'node:test';
import assert from 'node:assert';
import { request } from './helpers/request.helper.js';
import { TEST_ACCESS_TOKEN } from '../environment.js';

describe('/order test.', async () => {
  test('Retrieve all orders.', async () => {
    const res = await request('/order', 'GET', {
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.ok(Array.isArray(data));
  });
});
