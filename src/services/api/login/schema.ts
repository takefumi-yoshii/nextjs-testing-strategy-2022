import { z } from "zod";

export const LoginInputSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("不正なメールアドレス形式です"),
  password: z
    .string()
    .min(1, "パスワードを入力してください")
    .min(12, "12文字以上で入力してください"),
});
