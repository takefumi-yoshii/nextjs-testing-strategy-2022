import { errors } from "@/errors";
import {
  deleteUserHandler,
  getUserHandler,
  updateUserHandler,
} from "@/services/api.example.com/users/[id]/mock";
import { setupMockServer, testApiHandler } from "@/tests/jest";
import handler from "./[id].api";

describe("src/pages/api/users/[id].test.ts", () => {
  describe("GET", () => {
    setupMockServer(getUserHandler());
    test("401:未ログイン", async () => {
      const { status, json } = await testApiHandler(handler, undefined, false);
      expect(status).toHaveBeenCalledWith(401);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["UNAUTHORIZED"])
      );
    });
    test("400:非数", async () => {
      const { status, json } = await testApiHandler(handler, {
        query: { id: "abc" },
      });
      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["INVALID_PATH_PARAM"])
      );
    });
    test("400:負数", async () => {
      const { status, json } = await testApiHandler(handler, {
        query: { id: "-123" },
      });
      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["INVALID_PATH_PARAM"])
      );
    });
    test("200", async () => {
      const { status, json } = await testApiHandler(handler, {
        query: { id: "123" },
      });
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({
          user: {
            id: "123",
            name: "test.user_123",
            email: "test.user_123@example.com",
          },
        })
      );
    });
  });

  describe("POST", () => {
    setupMockServer(getUserHandler());
    test("405", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "POST",
        query: { id: "123" },
      });
      expect(status).toHaveBeenCalledWith(405);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["METHOD_NOT_ALLOWED"])
      );
    });
  });

  describe("PUT", () => {
    setupMockServer(updateUserHandler());
    test("401:未ログイン", async () => {
      const { status, json } = await testApiHandler(
        handler,
        { method: "PUT" },
        false
      );
      expect(status).toHaveBeenCalledWith(401);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["UNAUTHORIZED"])
      );
    });
    test("400:非数", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "PUT",
        query: { id: "abc" },
      });
      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["INVALID_PATH_PARAM"])
      );
    });
    test("400:負数", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "PUT",
        query: { id: "-123" },
      });
      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["INVALID_PATH_PARAM"])
      );
    });
    test("400:不正入力値", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "PUT",
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
    test("200", async () => {
      const body = {
        name: "taro.tanaka",
        email: "taro.tanaka@example.com",
        password: "abcdefg12345678",
      };
      const { status, json } = await testApiHandler(handler, {
        method: "PUT",
        query: { id: "123" },
        body,
      });
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({
          user: {
            id: "123",
            email: "taro.tanaka@example.com",
            name: "taro.tanaka",
          },
        })
      );
    });
  });

  describe("DELETE", () => {
    setupMockServer(deleteUserHandler());
    test("401:未ログイン", async () => {
      const { status, json } = await testApiHandler(
        handler,
        { method: "DELETE" },
        false
      );
      expect(status).toHaveBeenCalledWith(401);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["UNAUTHORIZED"])
      );
    });
    test("400:非数", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "DELETE",
        query: { id: "abc" },
      });
      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["INVALID_PATH_PARAM"])
      );
    });
    test("400:負数", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "DELETE",
        query: { id: "-123" },
      });
      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining(errors["INVALID_PATH_PARAM"])
      );
    });
    test("200", async () => {
      const { status, json } = await testApiHandler(handler, {
        method: "DELETE",
        query: { id: "123" },
      });
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(expect.objectContaining({ id: "123" }));
    });
  });
});
