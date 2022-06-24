import { errors } from "@/errors";
import { postFactory } from "@/services/api.example.com/posts/mock";
import {
  deletePostHandler,
  getPostHandler,
  updatePostHandler,
} from "@/services/api.example.com/posts/[id]/mock";
import { setupMockServer, testApiHandler } from "@/tests/jest";
import handler from "./[id].api";

describe("src/pages/api/posts/[id].test.ts", () => {
  describe("GET", () => {
    setupMockServer(getPostHandler());
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
        expect.objectContaining({ post: postFactory(123) })
      );
    });
  });

  describe("POST", () => {
    setupMockServer(getPostHandler());
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
    setupMockServer(updatePostHandler());
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
        title: "Lorem Ipsum",
        author: "takepepe",
        body: "",
        published: true,
        publishedAt: "2022-06-23T13:30:07.942Z",
      };
      const { status, json } = await testApiHandler(handler, {
        method: "PUT",
        query: { id: "123" },
        body,
      });
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ post: postFactory(123) })
      );
    });
  });

  describe("DELETE", () => {
    setupMockServer(deletePostHandler());
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
