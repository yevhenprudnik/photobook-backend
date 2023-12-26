import test, { after, before, describe } from 'node:test';
import assert from 'node:assert';
import { request } from './helpers/request.helper.js';
import { TEST_ACCESS_TOKEN } from '../environment.js';

describe('/page test.', async () => {
  const template = {
    name: 'Test Template',
    html: '<!DOCTYPE html><html><body><h1>Hello, World!</h1></body></html>',
    requiredReplacements: ['field1', 'field2'],
  };

  const photobook = {
    name: 'Test Photobook',
  };

  const validPage = {
    position: 1,
    type: 'default',
    photobookId: 0,
    templateId: 0,
    replacements: {
      field1: 'Hello,',
      field2: 'World!',
    },
  };

  /**
   * @type {number}
   */
  let createdPageId;

  before(async () => {
    const [templateRes, photobookRes] = await Promise.all([
      request('/template', 'POST', {
        headers: {
          authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
        },
        body: template,
      }),
      request('/photobook', 'POST', {
        headers: {
          authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
        },
        body: photobook,
      }),
    ]);

    validPage.templateId = await templateRes.json();
    validPage.photobookId = await photobookRes.json();
  });

  after(async () => {
    const [templateRes, photobookRes] = await Promise.all([
      request(`/template/${validPage.templateId}`, 'DELETE', {
        headers: {
          authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
        },
      }),
      request(`/photobook/${validPage.photobookId}`, 'DELETE', {
        headers: {
          authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
        },
      }),
    ]);

    const templateData = await templateRes.json();
    const photobookData = await photobookRes.json();

    assert.deepStrictEqual(templateData, { affected: 1 });
    assert.deepStrictEqual(photobookData, { affected: 1 });
  });

  test('Retrieve all pages.', async () => {
    const res = await request('/page', 'GET', {
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.ok(Array.isArray(data));
  });

  test('Fail to create a page for unauthorized user.', async () => {
    const res = await request('/page', 'POST', {
      body: validPage,
    });

    assert.strictEqual(res.status, 400);

    const data = await res.json();

    assert.strictEqual(data.statusCode, 400);
    assert.strictEqual(
      data.message,
      "headers must have required property 'authorization'",
    );
  });

  test('Fail to create a page with invalid data.', async () => {
    const res = await request('/page', 'POST', {
      body: {
        ...validPage,
        replacements: {
          field2: 'Missing field1',
        },
      },
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 400);

    const data = await res.json();

    assert.strictEqual(data.message, "Missing 'field1' required field.");
  });

  test('Create a new page successfully.', async () => {
    const res = await request('/page', 'POST', {
      body: validPage,
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(typeof data, 'number');

    createdPageId = data;
  });

  test('Find created page successfully.', async () => {
    const res = await request(`/page/${createdPageId}`, 'GET');

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(typeof data.id, 'number');
    assert.strictEqual(data.position, validPage.position);
    assert.strictEqual(data.type, validPage.type);
    assert.deepStrictEqual(data.replacements, validPage.replacements);
  });

  test('Fail to update a page with invalid ID.', async () => {
    const res = await request('/page/9999', 'POST', {
      body: validPage,
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 404);
  });

  test('Update an existing page.', async () => {
    const updatedPage = {
      position: 0,
      type: 'cover',
      replacements: {
        field1: 'Update,',
        field2: 'Test!',
      },
    };

    const res = await request(`/page/${createdPageId}`, 'POST', {
      body: updatedPage,
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(data.id, createdPageId);
    assert.strictEqual(data.position, updatedPage.position);
    assert.strictEqual(data.type, updatedPage.type);
    assert.deepStrictEqual(data.replacements, updatedPage.replacements);
  });

  test('Fail to delete a page with invalid ID.', async () => {
    const res = await request('/page/9999', 'DELETE', {
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 404);
  });

  test('Delete an existing page.', async () => {
    const res = await request(`/page/${createdPageId}`, 'DELETE', {
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.deepStrictEqual(data, { affected: 1 });
  });
});
