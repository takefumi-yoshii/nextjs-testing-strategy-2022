import { errors } from "@/errors";
import { ZodError, ZodObject } from "zod";
import { ErrResponse } from "../fetcher/type";
import type { Err, HttpResponse } from "./type";

export function transformValidationErrors(
  error: unknown,
  throwErr: boolean
): Promise<ErrResponse> {
  if (error instanceof ZodError) {
    const err: Err = {
      ...errors["VALIDATION"],
      errors: error.errors.map((issue) => ({
        code: issue.code,
        name: `${issue.path[0]}`,
        message: issue.message,
      })),
    };
    const response: ErrResponse = {
      data: null,
      err,
      status: errors["VALIDATION"].status,
    };
    if (throwErr) throw response;
    return Promise.resolve(response);
  }
  throw error;
}

export function transformResponse<T>(throwErr: boolean) {
  return async (res: Response): Promise<HttpResponse<T>> => {
    const json = await res.json();
    if (!res.ok) {
      const err: Err = { ...json, status: res.status };
      const response = { data: null, err, status: res.status };
      if (throwErr) throw response;
      return response;
    }
    return { data: json, err: null, status: res.status };
  };
}

export function transformError<T>(err: unknown): Promise<HttpResponse<T>> {
  if (err instanceof Error) {
    const error: ErrResponse = {
      data: null,
      err: { message: err.message, status: -1 },
      status: -1,
    };
    return Promise.resolve(error);
  }
  throw err;
}

export function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
  validationSchema?: ZodObject<any>,
  throwErr = false
) {
  try {
    if (validationSchema) {
      const data = JSON.parse(init?.body?.toString() || "");
      validationSchema.parse(data);
    }
  } catch (err) {
    return transformValidationErrors(err, throwErr);
  }
  return fetch(input, init)
    .then(transformResponse<T>(throwErr))
    .catch((err) => transformError<T>(err));
}
