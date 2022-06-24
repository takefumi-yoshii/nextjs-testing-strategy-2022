import { InvalidPathParamError } from "@/errors";

function assertPathParam(
  queryStringLike: string | string[] | undefined
): asserts queryStringLike is string {
  if (typeof queryStringLike !== "string") throw new InvalidPathParamError();
}

function numericPathParam(
  queryStringLike: string | string[] | undefined
): asserts queryStringLike is string {
  if (
    typeof queryStringLike !== "string" ||
    !/^([1-9]\d*|0)$/.test(queryStringLike)
  )
    throw new InvalidPathParamError();
}

export function str(queryStringLike: string | string[] | undefined) {
  assertPathParam(queryStringLike);
  return queryStringLike;
}

export function num(queryStringLike: string | string[] | undefined) {
  numericPathParam(queryStringLike);
  return queryStringLike;
}
