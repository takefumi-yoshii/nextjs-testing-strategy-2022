import { defaultHeaders } from "../..";
import { fetcher } from "../../fetcher";
import { PostInputSchema } from "../schema";
import type { PostData, PostInput } from "../type";

export const path = (id: string) => `/api/posts/${id}`;

export const updatePost = (
  query: { id: string },
  data: PostInput,
  throwErr = false
) =>
  fetcher<PostData>(
    path(query.id),
    {
      method: "PUT",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    },
    PostInputSchema,
    throwErr
  );

export const deletePost = (query: { id: string }, throwErr = false) =>
  fetcher<{ id: string }>(
    path(query.id),
    {
      method: "DELETE",
      headers: defaultHeaders,
    },
    undefined,
    throwErr
  );
