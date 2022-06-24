import { path } from ".";
import { restHandlerFactory } from "../fetcher/mock";
import type { UserData, UserInput, UsersData } from "./type";

export const userFactory = (id: number) => ({
  id: `${id}`,
  name: `test.user_${id}`,
  email: `test.user_${id}@example.com`,
});

export const usersFactory = (length: number) =>
  Array.from({ length }).map((_, id) => userFactory(id));

export const usersFixture = { users: usersFactory(10) };

export const getUsersHandler = restHandlerFactory<{}, {}, UsersData>(
  "get",
  path(),
  (_, res, ctx) => res(ctx.json(usersFixture))
);

export const createUserHandler = restHandlerFactory<UserInput, {}, UserData>(
  "post",
  path(),
  (req, res, ctx) =>
    res(
      ctx.status(201),
      ctx.json({
        user: { id: "0", name: req.body.name, email: req.body.email },
      })
    )
);

export const defaultUsersHandlers = [getUsersHandler(), createUserHandler()];
