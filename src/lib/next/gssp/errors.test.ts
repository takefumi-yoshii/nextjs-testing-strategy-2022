import { RedirectError } from "./error";

describe("src/lib/next/gssp/errors.test.ts", () => {
  describe("RedirectError", () => {
    test("toProps", () => {
      const error = new RedirectError({ permanent: false, destination: "/" });
      expect(error.toProps()).toMatchObject({
        redirect: {
          basePath: undefined,
          permanent: false,
          destination: "/",
        },
      });
    });
  });
});
