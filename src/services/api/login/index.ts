import { defaultHeaders } from "..";
import { fetcher } from "../fetcher";
import { LoginInputSchema } from "./schema";
import { LoginData, LoginInput } from "./type";

/* istanbul ignore next */
export * from "./schema";
/* istanbul ignore next */
export * from "./type";

export const path = () => `/api/login`;

export const postLogin = (data: LoginInput, throwErr = false) =>
  fetcher<LoginData>(
    path(),
    {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    },
    LoginInputSchema,
    throwErr
  );
