import {Context} from 'koa';

import {Options} from 'koa-static';

export type HTTPMethod = 'POST' | 'GET' | 'HEAD' | 'PUT' | 'DELETE';

export interface AwesomeStaticOptions extends Options {
  route?: string;
  allowMethods?: HTTPMethod[];
}

export type AwesomeStaticMiddleware = (
  ctx: Context,
  next: NextFunction,
) => Promise<void>;

export type NextFunction = () => Promise<unknown>;
