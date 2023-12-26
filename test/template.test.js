import test, { describe } from 'node:test';
import assert from 'node:assert';
import { request } from './helpers/request.helper.js';
import { TEST_ACCESS_TOKEN } from '../environment.js';

describe('/templates test.', async () => {
  const validTemplate = {
    name: 'Test Template',
    html: '<!DOCTYPE html><html><body><h1>Hello, World!</h1></body></html>',
    requiredReplacements: ['field1', 'field2'],
  };

  const invalidTemplate = {
    name: 'Short',
    html: 'Invalid HTML Content',
    requiredReplacements: ['field1'],
  };

  /**
   * @type {number}
   */
  let createdTemplateId;

  test('Retrieve all templates.', async () => {
    const res = await request('/template', 'GET', {
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.ok(Array.isArray(data));
  });

  test('Fail to create a template for unauthorized user.', async () => {
    const res = await request('/template', 'POST', {
      body: validTemplate,
    });

    assert.strictEqual(res.status, 400);

    const data = await res.json();

    assert.strictEqual(data.statusCode, 400);
    assert.strictEqual(
      data.message,
      "headers must have required property 'authorization'",
    );
  });

  test('Fail to create a template with invalid data.', async () => {
    const res = await request('/template', 'POST', {
      body: invalidTemplate,
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 400);

    const data = await res.json();

    assert.strictEqual(
      data.message,
      'body/html must match pattern "<!DOCTYPE.*>|<[^>]+>"',
    );
  });

  test('Create a new template successfully.', async () => {
    const res = await request('/template', 'POST', {
      body: validTemplate,
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(typeof data, 'number');

    createdTemplateId = data;
  });

  test('Find created template successfully.', async () => {
    const res = await request(`/template/${createdTemplateId}`, 'GET');

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(typeof data.id, 'number');
    assert.strictEqual(data.name, validTemplate.name);
    assert.strictEqual(data.html, validTemplate.html);
    assert.deepStrictEqual(
      data.requiredReplacements,
      validTemplate.requiredReplacements,
    );
  });

  test('Fail to update a template with invalid ID.', async () => {
    const res = await request('/template/9999', 'POST', {
      body: validTemplate,
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 404);
  });

  test('Update an existing template.', async () => {
    const updatedTemplate = {
      name: 'Updated Template Name',
      html: '<!DOCTYPE html><html><body><h1>Updated!</h1></body></html>',
      requiredReplacements: ['updatedField1', 'updatedField2'],
    };

    const res = await request(`/template/${createdTemplateId}`, 'POST', {
      body: updatedTemplate,
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.strictEqual(data.id, createdTemplateId);
    assert.strictEqual(data.name, updatedTemplate.name);
    assert.strictEqual(data.html, updatedTemplate.html);
    assert.deepStrictEqual(
      data.requiredReplacements,
      updatedTemplate.requiredReplacements,
    );
  });

  test('Fail to delete a template with invalid ID.', async () => {
    const res = await request('/template/9999', 'DELETE', {
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 404);
  });

  test('Delete an existing template.', async () => {
    const res = await request(`/template/${createdTemplateId}`, 'DELETE', {
      headers: {
        authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
      },
    });

    assert.strictEqual(res.status, 200);

    const data = await res.json();

    assert.deepStrictEqual(data, { affected: 1 });
  });
});
