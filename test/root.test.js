import test, { describe } from 'node:test';
import assert from 'node:assert';
import { request } from './helpers/request.helper.js';

describe('Root test', async () => {
  test('Should return { root: true }', async t => {
    const res = await request('/', 'GET');

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.deepStrictEqual(data, { root: true });
  });
});
