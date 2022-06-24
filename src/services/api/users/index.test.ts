import { errors } from "@/errors";
import { setupMockServer } from "@/tests/jest";
import { createUser } from ".";
import { ErrResponse } from "../fetcher/type";
import { createUserHandler } from "./mock";

describe("src/services/api/users/index.test.ts", () => {
  setupMockServer(createUserHandler());
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
  describe("createUser", () => {
    describe("不正な入力値の場合", () => {
      test("err が格納されること", async () => {
        const { data, err } = await createUser(invalidInput);
        expect(data).toBeNull();
        expect(err).toEqual(validationError);
      });
      test("throwErr 引数を指定すると、例外を throw すること", async () => {
        try {
          await createUser(invalidInput, true);
          throw "";
        } catch (err) {
          expect(err).toEqual(expetedErrResponse);
        }
      });
    });
  });
});
