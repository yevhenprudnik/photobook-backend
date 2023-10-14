import { FastifyInstance } from 'fastify';

export interface Server extends FastifyInstance {}

export function Route(server: Server): Promise<void>;
