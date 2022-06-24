import { testApiHandler } from "@/tests/jest";
import { handle } from "./handle";

describe("src/lib/next/api/middlewares/handle.test.ts", () => {
  describe("handle", () => {
    test("DataResponse が send されること", async () => {
      const data = { message: "hello" };
      const handler = handle(async () => ({ data, err: null, status: 200 }));
      const { status, json } = await testApiHandler(handler);
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(expect.objectContaining(data));
    });

    test("ErrResponse が send されること", async () => {
      const err = { message: "good by", status: 500 };
      const handler = handle(async () => ({ data: null, err, status: 500 }));
      const { status, json } = await testApiHandler(handler);
      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith(expect.objectContaining(err));
    });
  });
});
