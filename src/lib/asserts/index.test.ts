import { z, ZodError } from "zod";
import { assertBoolean, assertBySchema, AssertsError, assertString } from ".";

describe("src/lib/asserts/index.test.ts", () => {
  describe("assertBoolean", () => {
    test("boolean値の場合、例外を投げない", async () => {
      assertBoolean(true);
      expect(true).toBe(true);
    });
    test("boolean値以外の場合、AssertsErrorを投げる", async () => {
      expect(() => assertBoolean("true")).toThrow(AssertsError);
    });
  });
  describe("assertString", () => {
    test("string値の場合、例外を投げない", async () => {
      assertString("true");
      expect(true).toBe(true);
    });
    test("string値以外の場合、AssertsErrorを投げる", async () => {
      expect(() => assertString(true)).toThrow(AssertsError);
    });
  });
  describe("assertBySchema", () => {
    const LoginInputSchema = z.object({
      email: z
        .string()
        .min(1, "メールアドレスを入力してください")
        .email("不正なメールアドレス形式です"),
      password: z
        .string()
        .min(1, "パスワードを入力してください")
        .min(12, "12文字以上で入力してください"),
    });
    const body = {
      email: "test@example.com",
      password: "abcdefg12345678",
    };
    test("スキーマに適合する場合、例外を投げない", async () => {
      assertBySchema(body, LoginInputSchema);
      expect(true).toBe(true);
    });
    test("スキーマに適合しない場合、例外を投げる(不正なメールアドレス形式です)", async () => {
      expect(() =>
        assertBySchema({ ...body, email: "test" }, LoginInputSchema)
      ).toThrow(ZodError);
    });
    test("スキーマに適合しない場合、例外を投げる(12文字以上で入力してください)", async () => {
      expect(() =>
        assertBySchema({ ...body, password: "abc" }, LoginInputSchema)
      ).toThrow(ZodError);
    });
  });
});
