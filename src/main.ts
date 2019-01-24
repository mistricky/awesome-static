import * as Path from 'path';

import {Context} from 'koa';
import send from 'koa-send';

import {
  AwesomeStaticMiddleware,
  AwesomeStaticOptions,
  HTTPMethod,
  NextFunction,
} from './types';

function processOptions(
  root: string,
  options?: AwesomeStaticOptions,
): AwesomeStaticOptions {
  options = (options && Object.assign({}, options)) || {};
  options.index || (options.index = 'index.html');
  options.allowMethods || (options.allowMethods = ['GET', 'HEAD']);
  options.root = Path.resolve(root);

  return options;
}

function matchRoute(url: string, route: string): string | undefined {
  let result = /^\/?(.+?)\/?$/.exec(route);

  if (!result) {
    throw new Error('Please enter the correct route');
  }

  if (route !== '/') {
    route = result[1];
  }

  result = new RegExp(`^/${route}(.*)`).exec(url);

  if (!result) {
    return undefined;
  } else {
    return result[1];
  }
}

function generateMiddleware(
  options: AwesomeStaticOptions,
): AwesomeStaticMiddleware {
  return async function middleware(
    ctx: Context,
    next: NextFunction,
  ): Promise<void> {
    const {method, url} = ctx;
    const {allowMethods, defer, route} = options;
    let done: string | boolean = false;

    if (defer) {
      await next();

      if (ctx.body || ctx.status !== 404) {
        return;
      }
    }

    let result = matchRoute(url, route || '/');

    if (
      allowMethods!
        .map(method => method.toUpperCase())
        .includes(method as HTTPMethod) &&
      result
    ) {
      try {
        done = await send(ctx, result, options);
      } catch (e) {
        if (e.status !== 404) {
          throw e;
        }
      }
    }

    if (!done && !defer) {
      await next();
    }
  };
}

export function AwesomeStatic(
  root: string,
  options?: AwesomeStaticOptions,
): AwesomeStaticMiddleware {
  options = processOptions(root, options);

  return generateMiddleware(options);
}
