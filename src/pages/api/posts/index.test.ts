import { errors } from "@/errors";
import {
  createPostHandler,
  getPostsHandler,
  postFactory,
  postsFixture,
} from "@/services/api.example.com/posts/mock";
import { createUserHandler } from "@/services/api.example.com/users/mock";
import { setupMockServer, testApiHandler } from "@/tests/jest";
import handler from "./index.api";

describe("src/pages/api/posts/index.test.ts", () => {
  describe("GET", () => {
    setupMockServer(getPostsHandler());
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
      expect(json).toHaveBeenCalledWith(expect.objectContaining(postsFixture));
    });
  });

  describe("POST", () => {
    setupMockServer(createPostHandler());
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
          title: "Lorem Ipsum",
          author: "takepepe",
          body: "",
          published: true,
          publishedAt: "2022-06-23T13:30:07.942Z",
        },
      });
      expect(status).toHaveBeenCalledWith(201);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({
          post: postFactory(0),
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
