import { z } from "zod";

export const UserInputSchema = z.object({
  name: z.string().min(1, "ユーザー名を入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("不正なメールアドレス形式です"),
});
