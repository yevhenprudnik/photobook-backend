import test from 'node:test';
import assert from 'node:assert';

test('Should test async properly', async t => {
  const res = await fetch('http://localhost:8080/');

  assert.strictEqual(res.status, 200);

  const data = await res.json();

  assert.deepStrictEqual(data, { root: true });
});
