import { path } from ".";
import { restHandlerFactory } from "../fetcher/mock";
import type { UserData, UserInput } from "./type";

export const createUserHandler = restHandlerFactory<UserInput, {}, UserData>(
  "post",
  path(),
  (req, res, ctx) =>
    res(
      ctx.json({
        user: { id: "0", name: req.body.name, email: req.body.email },
      })
    )
);
