import { UnauthorizedError } from "@/errors";
import { apiHandlerArgs } from "@/tests/jest";
import { auth } from "./auth";

describe("src/lib/next/gssp/middlewares/auth.test.ts", () => {
  describe("auth", () => {
    test("session.user が存在しなければ、UnauthorizedError を throw すること", () => {
      return auth(...apiHandlerArgs())
        .then(() => {
          throw Error();
        })
        .catch((err) => {
          expect(err instanceof UnauthorizedError).toBeTruthy();
        });
    });
    test("session.user が存在すれば、session.user を含んだ args を返すこと", () => {
      return auth(
        ...apiHandlerArgs({ reqOptions: { session: { user: "me" } } })
      ).then(([_req, _res, user]) => {
        expect(user).toBe("me");
      });
    });
  });
});
