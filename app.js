import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import AutoLoad from '@fastify/autoload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename));

/**
 * @param {import('fastify').FastifyInstance} server
 * @param {import('fastify').FastifyServerOptions} options
 */
export default async (server, options) => {
  server.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
  });

  server.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
  });
};
