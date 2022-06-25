import { path } from ".";
import { restHandlerFactory } from "../fetcher/mock";
import type { LoginData, LoginInput } from "./type";

export const postLoginHandler = restHandlerFactory<LoginInput, {}, LoginData>(
  "post",
  path(),
  (_, res, ctx) => res(ctx.json({ user: { id: "0", name: "user" } }))
);
