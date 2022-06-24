import { errors } from "@/errors";
import { setupMockServer } from "@/tests/jest";
import { deleteUser, updateUser } from ".";
import { ErrResponse } from "../../fetcher/type";
import { deleteUserHandler, updateUserHandler } from "./mock";

describe("src/services/api/users/[id]/index.test.ts", () => {
  const server = setupMockServer(updateUserHandler(), deleteUserHandler());
  const invalidInput = {
    name: "test.user_1",
    email: "test",
  };
  const validationError = {
    ...errors["VALIDATION"],
    errors: [
      {
        code: "invalid_string",
        message: "不正なメールアドレス形式です",
        name: "email",
      },
    ],
  };
  const expetedErrResponse: ErrResponse = {
    data: null,
    err: validationError,
    status: 400,
  };
  describe("updateUser", () => {
    describe("不正な入力値の場合", () => {
      test("err にバリデーションエラーが格納されること", async () => {
        const { data, err } = await updateUser("1", invalidInput);
        expect(data).toBeNull();
        expect(err).toEqual(validationError);
      });
      test("throwErr 引数を指定すると、例外を throw すること", async () => {
        try {
          await updateUser("1", invalidInput, true);
          throw "";
        } catch (err) {
          expect(err).toEqual(expetedErrResponse);
        }
      });
    });
  });
  describe("deleteUser", () => {
    test("正常系レスポンスの場合、id が返ってくること", async () => {
      const { data, err } = await deleteUser("1");
      expect(err).toBeNull();
      expect(data).toEqual({ id: "1" });
    });
    test("HttpError が発生した時、throwErr 引数を指定していた場合、例外を throw すること", async () => {
      const err = errors["INTERNAL_SERVER"];
      server.use(deleteUserHandler({ err }));
      try {
        await deleteUser("1", true);
        throw "";
      } catch (error) {
        expect(error).toEqual({ data: null, err, status: err.status });
      }
    });
  });
});
