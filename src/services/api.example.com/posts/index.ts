import { defaultHeaders, host } from "..";
import { fetcher } from "../fetcher";
import { PostInputSchema } from "./schema";
import type { PostData, PostInput, PostsData } from "./type";

/* istanbul ignore next */
export * from "./schema";
/* istanbul ignore next */
export * from "./type";

export const path = () => host(`/api/posts`);

export const getPosts = (throwErr = false) =>
  fetcher<PostsData>(
    path(),
    { method: "GET", headers: defaultHeaders },
    undefined,
    throwErr
  );

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
