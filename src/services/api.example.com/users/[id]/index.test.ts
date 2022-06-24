import { errors } from "@/errors";
import { setupMockServer } from "@/tests/jest";
import { updateUser } from ".";
import { ErrResponse } from "../../fetcher/type";
import { updateUserHandler } from "./mock";

describe("src/services/api.example.com/users/[id]/index.test.ts", () => {
  setupMockServer(updateUserHandler());
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
        const { data, err } = await updateUser({ id: "1" }, invalidInput);
        expect(data).toBeNull();
        expect(err).toEqual(validationError);
      });
      test("throwErr 引数を指定すると、例外を throw すること", async () => {
        try {
          await updateUser({ id: "1" }, invalidInput, true);
          throw "";
        } catch (err) {
          expect(err).toEqual(expetedErrResponse);
        }
      });
    });
  });
});
