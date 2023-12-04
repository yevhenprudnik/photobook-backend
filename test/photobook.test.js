import test, { describe } from 'node:test';
import assert from 'node:assert';
import { request } from './helpers/request.helper.js';
import { TEST_ACCESS_TOKEN } from '../environment.js';

describe('/photobook test.', async () => {
  const photobook = {
    name: 'Test Photobook',
  };

  /**
   * @type {number}
   */
  let createdPhotobookId;

  test('Retrieve all photobooks.', async () => {
    const res = await request('/photobook', 'GET');

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.ok(Array.isArray(data));
  });

  test('Fail to create a photobook for unauthorized user.', async () => {
    const res = await request('/photobook', 'POST', {
      body: photobook,
    });

    assert.strictEqual(res.status, 400);

    const data = await res.json();

    assert.strictEqual(data.statusCode, 400);
    assert.strictEqual(
      data.message,
      "headers must have required property 'authorization'",
    );
  });

  test('Fail to create a photobook with invalid data.', async () => {
    const res = await request('/photobook', 'POST', {
      body: {},
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 400);

    const data = await res.json();

    assert.strictEqual(data.message, `body must have required property 'name'`);
  });

  test('Create a new photobook successfully.', async () => {
    const res = await request('/photobook', 'POST', {
      body: photobook,
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(typeof data, 'number');

    createdPhotobookId = data;
  });

  test('Find created photobook successfully.', async () => {
    const res = await request(`/photobook/${createdPhotobookId}`, 'GET');

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(typeof data.id, 'number');
    assert.strictEqual(data.name, photobook.name);
  });

  test('Fail to update a photobook with invalid ID.', async () => {
    const res = await request('/photobook/9999', 'POST', {
      body: photobook,
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 404);
  });

  test('Update an existing photobook.', async () => {
    const updatedPhotobook = {
      name: 'Updated',
    };

    const res = await request(`/photobook/${createdPhotobookId}`, 'POST', {
      body: updatedPhotobook,
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(data.id, createdPhotobookId);
    assert.strictEqual(data.name, updatedPhotobook.name);
  });

  test('Fail to delete a photobook with invalid ID.', async () => {
    const res = await request('/photobook/9999', 'DELETE', {
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 404);
  });

  test('Delete an existing photobook.', async () => {
    const res = await request(`/photobook/${createdPhotobookId}`, 'DELETE', {
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.deepStrictEqual(data, { affected: 1 });
  });
});
