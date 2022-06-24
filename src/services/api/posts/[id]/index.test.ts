import { errors } from "@/errors";
import { setupMockServer } from "@/tests/jest";
import { deletePost, updatePost } from ".";
import { ErrResponse } from "../../fetcher/type";
import { deletePostHandler, updatePostHandler } from "./mock";

describe("src/services/api/posts/[id]/index.test.ts", () => {
  const server = setupMockServer(updatePostHandler(), deletePostHandler());
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
  describe("deletePost", () => {
    test("正常系レスポンスの場合、id が返ってくること", async () => {
      const { data, err } = await deletePost({ id: "1" });
      expect(err).toBeNull();
      expect(data).toEqual({ id: "1" });
    });
    test("HttpError が発生した時、throwErr 引数を指定していた場合、例外を throw すること", async () => {
      const err = errors["INTERNAL_SERVER"];
      server.use(deletePostHandler({ err }));
      try {
        await deletePost({ id: "1" }, true);
        throw "";
      } catch (error) {
        expect(error).toEqual({ data: null, err, status: err.status });
      }
    });
  });
});
