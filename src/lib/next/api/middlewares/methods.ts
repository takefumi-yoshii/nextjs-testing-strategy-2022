import { HttpError, MethodNotAllowedError } from "@/errors";
import { HandlerMiddleware } from "../type";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type Handlers = { [K in Method]?: HandlerMiddleware };

function checkHandler(handler?: unknown) {
  function assertImplemented(fn?: unknown): asserts fn is HandlerMiddleware {
    if (!fn) throw new MethodNotAllowedError();
  }
  assertImplemented(handler);
  return handler;
}

export const methods = (handlers: Handlers): HandlerMiddleware => {
  return async (...args) => {
    try {
      const handler = checkHandler(handlers[args[0].method as Method]);
      return handler(...args);
    } catch (err) {
      if (err instanceof HttpError) {
        args[1].status(err.status).json(err.serialize());
      }
    }
    return args;
  };
};
