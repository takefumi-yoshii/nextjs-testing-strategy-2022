import { errors, HttpError } from "@/errors";
import { ZodError } from "zod";
import { HandlerMiddleware, HandlerMiddlewareArgs } from "../type";

export function combineHandlers(...handlerMiddlewares: HandlerMiddleware[]) {
  return async (...args: HandlerMiddlewareArgs) => {
    try {
      return await handlerMiddlewares.reduce(
        (current, next) =>
          current.then((args) => {
            if (typeof next !== "function") return args;
            return next(...args);
          }),
        Promise.resolve(args)
      );
    } catch (err) {
      if (err instanceof HttpError) {
        args[1].status(err.status).json(err.serialize());
        return;
      }
      if (err instanceof ZodError) {
        args[1].status(400).json(errors["VALIDATION"]);
        return;
      }
      throw err;
    }
  };
}
