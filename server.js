import fastify from 'fastify';
import app from './app.js';
import { HOST, PORT } from './environment.js';

const server = fastify();

server.register(app);

server.listen({ port: +PORT, host: HOST }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is listening on port ${PORT}`);
});
