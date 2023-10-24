import fastify from 'fastify';
import app from './app.js';
import db from './db/db.js';
import { HOST, PORT } from './environment.js';

const server = fastify();

server.register(app);

server.setErrorHandler((err, request, reply) => {
  const { statusCode, message } = err;

  reply.code(statusCode ?? 500).send({
    statusCode,
    message,
  });
});

server.listen({ port: +PORT, host: HOST }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is listening on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Stopping the server.');

  Promise.all([server.close(), db.destroy()]).then(() => process.exit(0));
});
