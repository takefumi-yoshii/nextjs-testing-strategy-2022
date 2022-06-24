import { errors } from "@/errors";
import { testApiHandler } from "@/tests/jest";
import handler from "./login.api";

describe("src/pages/api/login.test.ts", () => {
  describe("POST", () => {
    test("400:不正入力値", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "POST",
        body: { email: "taro.tanaka@example.com" },
      });
      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["VALIDATION"])
      );
    });
    test("200", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "POST",
        body: {
          email: "taro.tanaka@example.com",
          password: "abcdefg12345678",
        },
      });
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({
          user: {
            id: "taro.tanaka@example.com",
            name: "example.user",
          },
        })
      );
    });
  });
  describe("PUT", () => {
    test("405", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "PUT",
      });
      expect(status).toHaveBeenCalledWith(405);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["METHOD_NOT_ALLOWED"])
      );
    });
  });
});
