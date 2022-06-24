import { z } from "zod";

export const PostInputSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  author: z.string().min(1, "著者を入力してください"),
  body: z.string().optional(),
  published: z.boolean(),
  publishedAt: z.string(),
});
