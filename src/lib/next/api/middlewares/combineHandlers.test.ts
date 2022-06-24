import { errors, NotFoundError } from "@/errors";
import { apiHandlerArgs, testApiHandler } from "@/tests/jest";
import { combineHandlers } from "./combineHandlers";

describe("src/lib/next/api/middlewares/combineHandlers.test.ts", () => {
  describe("combineHandlers", () => {
    test("Middleware で 引数拡張できること", async () => {
      const fn = jest.fn();
      const handler = combineHandlers(
        async (...args) => [...args, "test"],
        async (req, res, ...args) => {
          fn(args);
          return [req, res, ...args];
        }
      );
      await handler(...apiHandlerArgs());
      expect(fn).toHaveBeenCalledWith(["test"]);
    });
    test("Middleware で 連続的に引数拡張できること", async () => {
      const fn = jest.fn();
      const handler = combineHandlers(
        async (...args) => [...args, "A"],
        async (...args) => [...args, "B"],
        async (...args) => [...args, "C"],
        async (req, res, ...args) => {
          fn(args);
          return [req, res, args];
        }
      );
      await handler(...apiHandlerArgs());
      expect(fn).toHaveBeenCalledWith(["A", "B", "C"]);
    });
    test("NotFoundError が throw された時、404レスポンスが返ること", async () => {
      const handler = combineHandlers(
        async () => {
          throw new NotFoundError();
        },
        async (...args) => args
      );
      const { status, json } = await testApiHandler(handler);
      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith(errors["NOT_FOUND"]);
    });
  });
});
