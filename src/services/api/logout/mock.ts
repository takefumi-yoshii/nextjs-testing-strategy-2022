import { path } from ".";
import { restHandlerFactory } from "../fetcher/mock";
import type { LogoutData } from "./type";

export const postLogoutHandler = restHandlerFactory<{}, {}, LogoutData>(
  "post",
  path(),
  (_, res, ctx) => res(ctx.json({ message: "logout" }))
);
