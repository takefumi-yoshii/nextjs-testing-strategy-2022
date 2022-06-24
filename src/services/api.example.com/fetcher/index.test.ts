import { errors } from "@/errors";
import { setupMockServer } from "@/tests/jest";
import { rest } from "msw";
import z, { ZodError } from "zod";
import {
  fetcher,
  transformError,
  transformResponse,
  transformValidationErrors,
} from ".";
import { DataResponse, Err, ErrResponse } from "./type";

describe("src/services/api.example.com/fetcher/index.test.ts", () => {
  const TestSchema = z.object({ name: z.string() });
  const server = setupMockServer();
  const path = "/api/example";
  const errStatus = 400;
  const expetedData = { message: "ok" };
  const expetedErr: Err = { message: "err", status: errStatus };
  const dataResponse: DataResponse<typeof expetedData> = {
    data: expetedData,
    err: null,
    status: 200,
  };
  const errResponse: ErrResponse = {
    data: null,
    err: expetedErr,
    status: errStatus,
  };
  const notHttpErrorResponse: ErrResponse = {
    data: null,
    err: { message: "err", status: -1 },
    status: -1,
  };
  const handler200 = rest.get(path, (_, res, ctx) =>
    res(ctx.json(expetedData))
  );
  const handler400 = rest.get(path, (_, res, ctx) =>
    res(ctx.status(errStatus), ctx.json(expetedErr))
  );
  const exampleFether = (throwErr = false) =>
    fetcher(path, { method: "GET" }, undefined, throwErr);

  describe("transformValidationErrors", () => {
    test("バリデーションエラーは、ErrResponse型に整形されること", async () => {
      try {
        TestSchema.parse({});
      } catch (err) {
        expect(err instanceof ZodError).toBeTruthy();
        const data = await transformValidationErrors(err, false);
        const expected: ErrResponse = {
          data: null,
          err: { ...errors["VALIDATION"] },
          status: 400,
        };
        expect(data).toMatchObject(expected);
      }
    });
    test("throwErr引数がtrueの場合、ErrResponse型をリスローすること", async () => {
      try {
        TestSchema.parse({});
      } catch (err) {
        expect(err instanceof ZodError).toBeTruthy();
        try {
          await transformValidationErrors(err, true);
        } catch (err) {
          const expected: ErrResponse = {
            data: null,
            err: { ...errors["VALIDATION"] },
            status: 400,
          };
          expect(err).toMatchObject(expected);
        }
      }
    });
    test("ZodErrorインタンス以外は、リスローすること", () => {
      try {
        throw new Error("test");
      } catch (err) {
        expect(() => transformValidationErrors(err, false)).toThrow();
      }
    });
  });
  describe("transformResponse", () => {
    test("正常系レスポンスの場合、DataResponse型に整形されること", async () => {
      server.use(handler200);
      const data = await fetch(path).then(transformResponse(false));
      expect(data).toMatchObject(dataResponse);
    });
    test("異常系レスポンスの場合、ErrResponse型に整形されること", async () => {
      server.use(handler400);
      const data = await fetch(path).then(transformResponse(false));
      expect(data).toMatchObject(errResponse);
    });
    test("throwErr引数がtrueで異常系レスポンスの場合、ErrResponseをスローすること", async () => {
      server.use(handler400);
      try {
        await fetch(path).then(transformResponse(true));
      } catch (err) {
        expect(err).toMatchObject(errResponse);
      }
    });
  });
  describe("transformError", () => {
    test("Errorインタンスは、ErrResponse型に整形されること", async () => {
      const res = await transformError(new Error("err"));
      expect(res).toMatchObject(notHttpErrorResponse);
    });
    test("Errorインタンス以外は、リスローすること", () => {
      try {
        throw "test";
      } catch (err) {
        try {
          transformError(err);
        } catch (_err) {
          expect(_err).toBe("test");
        }
      }
    });
  });
  describe("fetcher", () => {
    test("正常系レスポンスの場合、DataResponse型に整形されること", async () => {
      server.use(handler200);
      const data = await exampleFether();
      expect(data).toMatchObject(dataResponse);
    });
    test("異常系レスポンスの場合、ErrResponse型に整形されること", async () => {
      server.use(handler400);
      const data = await exampleFether();
      expect(data).toMatchObject(errResponse);
    });
    test("throwErr引数がtrueで異常系レスポンスの場合、ErrResponseをスローすること", async () => {
      server.use(handler400);
      try {
        await exampleFether(true);
      } catch (err) {
        expect(err).toMatchObject(errResponse);
      }
    });
  });
});
