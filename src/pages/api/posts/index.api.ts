import { auth, combineHandlers, handle, methods } from "@/lib/next/api";
import {
  createPost,
  getPosts,
  PostData,
  PostsData,
} from "@/services/api.example.com/posts";

export default combineHandlers(
  auth,
  methods({
    GET: handle<PostsData>(() => getPosts()),
    POST: handle<PostData>(({ body }) => createPost(body)),
  })
);
