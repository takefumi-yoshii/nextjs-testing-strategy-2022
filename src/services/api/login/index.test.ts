import { errors } from "@/errors";
import { setupMockServer } from "@/tests/jest";
import { postLogin } from ".";
import { ErrResponse } from "../fetcher/type";
import { postLoginHandler } from "./mock";

describe("src/services/api/login/index.test.ts", () => {
  setupMockServer(postLoginHandler());
  const invalidInput = {
    email: "test.user_1@example.com",
    password: "xxx",
  };
  const validationError = {
    ...errors["VALIDATION"],
    errors: [
      {
        code: "too_small",
        message: "12文字以上で入力してください",
        name: "password",
      },
    ],
  };
  const expetedErrResponse: ErrResponse = {
    data: null,
    err: validationError,
    status: 400,
  };
  describe("postLogin", () => {
    describe("不正な入力値の場合", () => {
      test("err が格納されること", async () => {
        const { data, err } = await postLogin(invalidInput);
        expect(data).toBeNull();
        expect(err).toEqual(validationError);
      });
      test("throwErr 引数を指定すると、例外を throw すること", async () => {
        try {
          await postLogin(invalidInput, true);
          throw "";
        } catch (err) {
          expect(err).toEqual(expetedErrResponse);
        }
      });
    });
  });
});
