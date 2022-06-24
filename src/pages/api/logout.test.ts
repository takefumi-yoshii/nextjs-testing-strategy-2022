import { errors } from "@/errors";
import { testApiHandler } from "@/tests/jest";
import handler from "./logout.api";

describe("src/pages/api/logout.test.ts", () => {
  describe("POST", () => {
    test("200", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "POST",
      });
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "logout" })
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
