import type { NextApiRequest, NextApiResponse } from "next";

export type HandlerMiddlewareArgs<T = any> = [
  NextApiRequest,
  NextApiResponse<T>,
  ...unknown[]
];

export type HandlerMiddleware<T = any> = (
  ...args: HandlerMiddlewareArgs<T>
) => Promise<HandlerMiddlewareArgs<T>>;
