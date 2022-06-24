import { errors } from "@/errors";
import { setupMockServer } from "@/tests/jest";
import { updatePost } from ".";
import { ErrResponse } from "../../fetcher/type";
import { updatePostHandler } from "./mock";

describe("src/services/api.example.com/posts/[id]/index.test.ts", () => {
  setupMockServer(updatePostHandler());
  const invalidInput = {
    title: "",
    author: "xxx",
    body: "xxx",
    published: true,
    publishedAt: "xxx",
  };
  const validationError = {
    ...errors["VALIDATION"],
    errors: [
      {
        code: "too_small",
        name: "title",
        message: "タイトルを入力してください",
      },
    ],
  };
  const expetedErrResponse: ErrResponse = {
    data: null,
    err: validationError,
    status: 400,
  };
  describe("updatePost", () => {
    describe("不正な入力値の場合", () => {
      test("err にバリデーションエラーが格納されること", async () => {
        const { data, err } = await updatePost({ id: "1" }, invalidInput);
        expect(data).toBeNull();
        expect(err).toEqual(validationError);
      });
      test("throwErr 引数を指定すると、例外を throw すること", async () => {
        try {
          await updatePost({ id: "1" }, invalidInput, true);
          throw "";
        } catch (err) {
          expect(err).toEqual(expetedErrResponse);
        }
      });
    });
  });
});
