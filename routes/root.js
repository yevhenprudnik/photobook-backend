/** @type {import('../index').Route} */
export default async server => {
  server.get('/', async (request, reply) => {
    return { root: true };
  });
};
