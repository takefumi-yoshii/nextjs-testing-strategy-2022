import { defaultHeaders, host } from "../..";
import { fetcher } from "../../fetcher";
import { UserInputSchema } from "../schema";
import type { UserData, UserInput } from "../type";

export const path = (id: string) => host(`/api/users/${id}`);

export const getUser = (query: { id: string }, throwErr = false) =>
  fetcher<UserData>(
    path(query.id),
    { method: "GET", headers: defaultHeaders },
    undefined,
    throwErr
  );

export const updateUser = (
  query: { id: string },
  data: UserInput,
  throwErr = false
) =>
  fetcher<UserData>(
    path(query.id),
    {
      method: "PUT",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    },
    UserInputSchema,
    throwErr
  );

export const deleteUser = (query: { id: string }, throwErr = false) =>
  fetcher<{ id: string }>(
    path(query.id),
    {
      method: "DELETE",
      headers: defaultHeaders,
    },
    undefined,
    throwErr
  );
