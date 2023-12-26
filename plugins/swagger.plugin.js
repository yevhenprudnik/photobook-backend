import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { API_URL, PROTOCOL } from '../environment.js';

export default fp(async (fastify) => {
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Photobook API',
        version: '1',
      },
      host: API_URL,
      schemes: [PROTOCOL],
      securityDefinitions: {
        ApiToken: {
          description:
            'Authorization header token, sample: "Bearer #ACCESS_TOKEN# #REFRESH_TOKEN#"',
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: '/documentation',
  });
});
