import { z } from "zod";
import { PostInputSchema } from "./schema";

export type Post = {
  id: string;
  title: string;
  author: string;
  body: string;
  published: boolean;
  publishedAt: string;
};

export type PostData = {
  post: Post;
};

export type PostsData = {
  posts: Post[];
};

export type PostInput = z.infer<typeof PostInputSchema>;
