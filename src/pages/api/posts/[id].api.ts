import { auth, combineHandlers, handle, methods } from "@/lib/next/api";
import { num } from "@/lib/next/asserts";
import { PostData } from "@/services/api.example.com/posts";
import {
  deletePost,
  getPost,
  updatePost,
} from "@/services/api.example.com/posts/[id]";

export default combineHandlers(
  auth,
  methods({
    GET: handle<PostData>((req) => getPost({ id: num(req.query.id) })),
    PUT: handle<PostData>((req) =>
      updatePost({ id: num(req.query.id) }, req.body)
    ),
    DELETE: handle<{ id: string }>((req) =>
      deletePost({ id: num(req.query.id) })
    ),
  })
);
