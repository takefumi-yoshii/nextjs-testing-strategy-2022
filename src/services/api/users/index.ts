import { defaultHeaders } from "..";
import { fetcher } from "../fetcher";
import { UserInputSchema } from "./schema";
import { UserData, UserInput } from "./type";

export const path = () => `/api/users`;

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
