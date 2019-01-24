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

function matchRoute(url: string, route: string): boolean {
  let result = /^\/?(.+?)\/?$/.exec(route);

  if (!result) {
    throw new Error('Please enter the correct route');
  }

  route = result[1];
  const routes = [`${route}/`, `/${route}`, `/${route}/`, route];

  for (let r of routes) {
    if (url === r) {
      return true;
    }
  }

  return false;
}

function generateMiddleware(
  options: AwesomeStaticOptions,
): AwesomeStaticMiddleware {
  return async function middleware(
    ctx: Context,
    next: NextFunction,
  ): Promise<void> {
    const {method, url} = ctx;
    const {allowMethods, defer, route, index} = options;
    let done: string | boolean = false;

    if (defer) {
      await next();

      if (ctx.body || ctx.status !== 404) {
        return;
      }
    }

    let result = /(.+?)([^\/]+)$/.exec(url);
    let filename: string = result ? result[2] : (index as string);
    let parsedUrl = (result && result[1]) || url;

    if (
      allowMethods!
        .map(method => method.toUpperCase())
        .includes(method as HTTPMethod) &&
      matchRoute(parsedUrl, route || '/')
    ) {
      try {
        done = await send(ctx, filename, options);
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
