/** @type {import('../index').Route} */
export default async server => {
  server.get('/', async (request, reply) => {
    return { root: true };
  });

  server.get('/fly', async (request, reply) => {
    return { flyIo: true };
  });
};
