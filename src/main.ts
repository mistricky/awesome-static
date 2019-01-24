import {Context} from 'koa';
import * as Serve from 'koa-static';
import {
  AwesomeStaticMiddleware,
  AwesomeStaticOptions,
  NextFunction,
} from './types';

function processOptions(options?: AwesomeStaticOptions): AwesomeStaticOptions {
  options = (options && Object.assign({}, options)) || {};
  options.index || (options.index = 'index.html');
  options.allowMethods || ['GET', 'HEAD'];

  return options;
}

function AwesomeStatic(root: string, options?: AwesomeStaticOptions) {
  options = processOptions(options);
}

export default AwesomeStatic;
