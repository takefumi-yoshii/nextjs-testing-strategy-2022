import { HttpError } from "@/errors";

describe("src/errors.test.ts", () => {
  describe("HttpError", () => {
    test("serialize", () => {
      const error = new HttpError("UNAUTHORIZED");
      expect(error.serialize()).toMatchObject({
        message: "Unauthorized Error",
        status: 401,
      });
    });
  });
});
