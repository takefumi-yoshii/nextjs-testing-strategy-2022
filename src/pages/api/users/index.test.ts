import { errors } from "@/errors";
import {
  createUserHandler,
  getUsersHandler,
  usersFixture,
} from "@/services/api.example.com/users/mock";
import { setupMockServer, testApiHandler } from "@/tests/jest";
import handler from "./index.api";

describe("src/pages/api/users/index.test.ts", () => {
  describe("GET", () => {
    setupMockServer(getUsersHandler());
    test("401:未ログイン", async () => {
      const { status, json } = await testApiHandler(handler, undefined, false);
      expect(status).toHaveBeenCalledWith(401);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["UNAUTHORIZED"])
      );
    });
    test("200", async () => {
      const { status, json } = await testApiHandler(handler);
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(expect.objectContaining(usersFixture));
    });
  });

  describe("POST", () => {
    setupMockServer(createUserHandler());
    test("401:未ログイン", async () => {
      const { status, json } = await testApiHandler(
        handler,
        { method: "POST" },
        false
      );
      expect(status).toHaveBeenCalledWith(401);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["UNAUTHORIZED"])
      );
    });
    test("400:不正入力値", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "POST",
        query: { id: "123" },
      });
      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({
          ...errors["VALIDATION"],
          errors: expect.anything(),
        })
      );
    });
    test("201", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "POST",
        body: {
          name: "taro.tanaka",
          email: "taro.tanaka@example.com",
          password: "abcdefg12345678",
        },
      });
      expect(status).toHaveBeenCalledWith(201);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({
          user: {
            id: "0",
            email: "taro.tanaka@example.com",
            name: "taro.tanaka",
          },
        })
      );
    });
  });

  describe("PUT", () => {
    setupMockServer(createUserHandler());
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
