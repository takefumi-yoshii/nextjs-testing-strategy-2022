import { defaultHeaders } from "../..";
import { fetcher } from "../../fetcher";
import { UserInputSchema } from "../schema";
import { UserData, UserInput } from "../type";

export const path = (id: string) => `/api/users/${id}`;

export const updateUser = (id: string, data: UserInput, throwErr = false) =>
  fetcher<UserData>(
    path(id),
    {
      method: "PUT",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    },
    UserInputSchema,
    throwErr
  );

export const deleteUser = (id: string, throwErr = false) =>
  fetcher<{ id: string }>(
    path(id),
    {
      method: "DELETE",
      headers: defaultHeaders,
    },
    undefined,
    throwErr
  );
