import { path } from ".";
import { restHandlerFactory } from "../../fetcher/mock";
import { postFactory } from "../mock";
import type { PostData, PostInput } from "../type";

export const getPostHandler = restHandlerFactory<{}, { id: string }, PostData>(
  "get",
  path(":id"),
  (req, res, ctx) => res(ctx.json({ post: postFactory(+req.params.id) }))
);

export const updatePostHandler = restHandlerFactory<
  PostInput,
  { id: string },
  PostData
>("put", path(":id"), (req, res, ctx) =>
  res(ctx.json({ post: postFactory(+req.params.id) }))
);

export const deletePostHandler = restHandlerFactory<
  {},
  { id: string },
  { id: string }
>("delete", path(":id"), (req, res, ctx) =>
  res(ctx.json({ id: req.params.id }))
);
