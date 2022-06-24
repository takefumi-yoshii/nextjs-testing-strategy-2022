import { path } from ".";
import { restHandlerFactory } from "../../fetcher/mock";
import { userFactory } from "../mock";
import type { UserData, UserInput } from "../type";

export const getUserHandler = restHandlerFactory<{}, { id: string }, UserData>(
  "get",
  path(":id"),
  (req, res, ctx) => res(ctx.json({ user: userFactory(+req.params.id) }))
);

export const updateUserHandler = restHandlerFactory<
  UserInput,
  { id: string },
  UserData
>("put", path(":id"), (req, res, ctx) =>
  res(
    ctx.json({
      user: { id: req.params.id, name: req.body.name, email: req.body.email },
    })
  )
);

export const deleteUserHandler = restHandlerFactory<
  {},
  { id: string },
  { id: string }
>("delete", path(":id"), (req, res, ctx) =>
  res(ctx.json({ id: req.params.id }))
);

export const defaultUserHandlers = [
  getUserHandler(),
  updateUserHandler(),
  deleteUserHandler(),
];
