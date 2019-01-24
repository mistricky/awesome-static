import {
  AwesomeStaticOptions,
  AwesomeStaticMiddleware,
  NextFunction
} from "./types";
import * as Serve from "koa-static";
import { Context } from "koa";

function processOptions(options?: AwesomeStaticOptions): AwesomeStaticOptions {
  options = (options && Object.assign({}, options)) || {};
  options.index || (options.index = "index.html");
  options.allowMethods || ["GET", "HEAD"];

  return options;
}

function AwesomeStatic(
  root: string,
  options?: AwesomeStaticOptions
): AwesomeStaticMiddleware {
  options = processOptions(options);

  return async (ctx: Context, next: NextFunction) => {
    await Serve(root, options)(ctx, next);
  };
}

export default AwesomeStatic;
