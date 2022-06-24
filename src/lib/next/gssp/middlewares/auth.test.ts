import { gsspCtx } from "@/tests/jest";
import { RedirectError } from "../error";
import { auth } from "./auth";

describe("src/lib/next/gssp/middlewares/auth.test.ts", () => {
  describe("auth", () => {
    test("session.user が存在しなければ、RedirectError を throw すること", () => {
      return auth(gsspCtx(undefined, undefined, false))
        .then(() => {
          throw Error();
        })
        .catch((err) => {
          expect(err instanceof RedirectError).toBeTruthy();
        });
    });
    test("session.user が存在すれば、session.user を含んだ args を返すこと", () => {
      return auth(
        gsspCtx(undefined, { reqOptions: { session: { user: "me" } } })
      ).then(([_ctx, user]) => {
        expect(user).toBe("me");
      });
    });
  });
});
