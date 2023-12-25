import {
  FastifyInstance,
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { User } from './db/repositories/user/types.d.ts';

export interface Server
  extends FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    JsonSchemaToTsProvider
  > {}

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

export function Route(server: Server): Promise<void>;
