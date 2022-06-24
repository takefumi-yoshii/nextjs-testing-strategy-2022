import { defaultHeaders } from "..";
import { fetcher } from "../fetcher";
import { PostInputSchema } from "./schema";
import type { PostData, PostInput } from "./type";

/* istanbul ignore next */
export * from "./schema";
/* istanbul ignore next */
export * from "./type";

export const path = () => `/api/posts`;

export const createPost = (data: PostInput, throwErr = false) =>
  fetcher<PostData>(
    path(),
    {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    },
    PostInputSchema,
    throwErr
  );
