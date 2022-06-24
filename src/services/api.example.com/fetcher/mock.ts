import {
  PathParams,
  ResponseComposition,
  ResponseResolver,
  rest,
  RestContext,
  RestRequest,
} from "msw";
import type { Err } from "./type";

export function restHandlerFactory<T, K extends PathParams, U>(
  method: keyof typeof rest,
  path: string,
  resolver: ResponseResolver<RestRequest<T, K>, RestContext, U | Err>
) {
  return (args?: {
    data?: U;
    err?: Err;
    status?: number;
    mock?: jest.Mock<any, any>;
  }) =>
    rest[method](
      path,
      (
        req: RestRequest<T, K>,
        res: ResponseComposition<U | Err>,
        ctx: RestContext
      ) => {
        if (args?.err) {
          args?.mock?.(args.err);
          return res(ctx.status(args.err.status), ctx.json(args.err));
        }
        if (args?.data) {
          args?.mock?.(args.data);
          return res(
            ctx.status(args.status || method === "post" ? 201 : 200),
            ctx.json(args.data)
          );
        }
        args?.mock?.(req.body);
        return resolver(req, res, ctx);
      }
    );
}
