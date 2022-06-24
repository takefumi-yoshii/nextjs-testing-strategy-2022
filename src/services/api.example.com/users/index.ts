import { defaultHeaders, host } from "..";
import { fetcher } from "../fetcher";
import { UserInputSchema } from "./schema";
import type { UserData, UserInput, UsersData } from "./type";

/* istanbul ignore next */
export * from "./schema";
/* istanbul ignore next */
export * from "./type";

export const path = () => host(`/api/users`);

export const getUsers = (throwErr = false) =>
  fetcher<UsersData>(
    path(),
    { method: "GET", headers: defaultHeaders },
    undefined,
    throwErr
  );

export const createUser = (data: UserInput, throwErr = false) =>
  fetcher<UserData>(
    path(),
    {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    },
    UserInputSchema,
    throwErr
  );
