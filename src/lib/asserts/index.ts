import { z, ZodObject } from "zod";

export class AssertsError extends Error {}

export function assertBoolean(value: unknown): asserts value is boolean {
  if (typeof value !== "boolean") throw new AssertsError();
}

export function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new AssertsError();
}

export function assertBySchema<T extends ZodObject<any>>(
  target: unknown,
  schema: T
): asserts target is z.infer<typeof schema> {
  schema.parse(target);
}
