import { defaultHeaders } from "..";
import { fetcher } from "../fetcher";
import { LogoutData } from "./type";

/* istanbul ignore next */
export * from "./type";

export const path = () => `/api/logout`;

export const postLogout = (throwErr = false) =>
  fetcher<LogoutData>(
    path(),
    {
      method: "POST",
      headers: defaultHeaders,
    },
    undefined,
    throwErr
  );
