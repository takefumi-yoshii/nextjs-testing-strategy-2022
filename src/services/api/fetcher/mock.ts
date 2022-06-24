import {
  PathParams,
  ResponseComposition,
  ResponseResolver,
  rest,
  RestContext,
  RestRequest,
} from "msw";
import type { Err } from "./type";

type HandlerFactoryArgs<T> = {
  data?: T;
  err?: Err;
  status?: number;
  mock?: jest.Mock<any, any>;
};

export function restHandlerFactory<T, K extends PathParams, U>(
  method: keyof typeof rest,
  path: string,
  resolver: ResponseResolver<RestRequest<T, K>, RestContext, U | Err>
) {
  return (args?: HandlerFactoryArgs<U>) =>
    rest[method](
      path,
      (
        req: RestRequest<T, K>,
        res: ResponseComposition<U | Err>,
        ctx: RestContext
      ) => {
        args?.mock?.(req.body);
        if (args?.err)
          return res(ctx.status(args.err.status), ctx.json(args.err));
        if (args?.data) {
          return res(ctx.status(args.status || 200), ctx.json(args.data));
        }
        return resolver(req, res, ctx);
      }
    );
}
