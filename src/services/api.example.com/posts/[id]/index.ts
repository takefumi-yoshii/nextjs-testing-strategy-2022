import { defaultHeaders, host } from "../..";
import { fetcher } from "../../fetcher";
import { PostInputSchema } from "../schema";
import type { PostData, PostInput } from "../type";

export const path = (id: string) => host(`/api/posts/${id}`);

export const getPost = (query: { id: string }, throwErr = false) =>
  fetcher<PostData>(
    path(query.id),
    { method: "GET", headers: defaultHeaders },
    undefined,
    throwErr
  );

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
