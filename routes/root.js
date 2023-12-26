/** @type {import('../index').Route} */
export default async server => {
  server.get('/', async (request, reply) => {
    return { root: true };
  });

  server.get('/healthcheck', async (request, reply) => {
    return { ok: true };
  });
};
