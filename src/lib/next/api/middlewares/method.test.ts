import { errors } from "@/errors";
import { apiHandlerArgs } from "@/tests/jest";
import { Method, methods } from "./methods";

describe("src/lib/next/api/middlewares/method.test.ts", () => {
  describe("methods", () => {
    test("GETリクエストがハンドラーで処理されること", async () => {
      const fn = jest.fn();
      const middleware = methods({
        GET: async (...args) => {
          fn(args);
          return args;
        },
      });
      await middleware(...apiHandlerArgs({ reqOptions: { method: "GET" } }));
      expect(fn).toHaveBeenCalled();
    });
    test.each(["POST", "PUT", "PATCH", "DELETE"])(
      "%sリクエストがハンドラーで処理されること",
      async (m) => {
        const method = m as Method;
        const fn = jest.fn();
        const middleware = methods({
          [method]: async (...args: unknown[]) => {
            fn(args);
            return args;
          },
        });
        await middleware(...apiHandlerArgs({ reqOptions: { method } }));
        expect(fn).toHaveBeenCalled();
      }
    );
    test("リクエストメソッドに対応するハンドラーが実装されていない場合、405 が send されること", async () => {
      const middleware = methods({ GET: async (...args) => args });
      const [req] = apiHandlerArgs({ reqOptions: { method: "POST" } });
      const status = jest.fn();
      const fn = jest.fn();
      const mockRes = {
        status: (s: number) => {
          status(s);
          return { json: fn };
        },
      };
      const err = errors["METHOD_NOT_ALLOWED"];
      await middleware(req, mockRes as any);
      expect(status).toHaveBeenCalledWith(err.status);
      expect(fn).toHaveBeenCalledWith(expect.objectContaining(err));
    });
  });
});
