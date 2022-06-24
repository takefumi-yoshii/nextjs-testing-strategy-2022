import { errors, NotFoundError } from "@/errors";
import { AssertsError } from "@/lib/asserts";
import { DataResponse } from "@/services/api/fetcher/type";
import { gsspCtx } from "@/tests/jest";
import { RedirectError } from "../error";
import { combineGssp } from "./combineGssp";

describe("src/lib/next/gssp/errors.test.ts", () => {
  describe("combineGssp", () => {
    const exampleProps: DataResponse<{ message: string }> = {
      data: { message: "hi" },
      err: null,
      status: 200,
    };
    describe("末尾のデータ取得関数結果", () => {
      test("middleware 無しでもデータ取得関数結果が返ること", async () => {
        const gssp = await combineGssp(async () => ({ props: exampleProps }));
        const res = await gssp(gsspCtx());
        expect(res).toMatchObject({ props: exampleProps });
      });
      test("middleware ありでもデータ取得関数結果が返ること", async () => {
        const gssp = await combineGssp(
          async (...args) => [...args, "A"],
          async (...args) => [...args, "B"],
          async (...args) => [...args, "C"],
          async () => ({ props: exampleProps })
        );
        const res = await gssp(gsspCtx());
        expect(res).toMatchObject({ props: exampleProps });
      });
    });
    describe("Middleware による引数拡張", () => {
      test("引数が拡張できること", async () => {
        const fn = jest.fn();
        const gssp = await combineGssp(
          async (...args) => [...args, "test"],
          async (...args) => {
            fn(args[1]);
            return { props: exampleProps };
          }
        );
        await gssp(gsspCtx());
        expect(fn).toHaveBeenCalledWith("test");
      });
      test("連続的に引数拡張できること", async () => {
        const fn = jest.fn();
        const gssp = await combineGssp(
          async (...args) => [...args, "A"],
          async (...args) => [...args, "B"],
          async (...args) => [...args, "C"],
          async (_, ...args) => {
            fn(args);
            return { props: exampleProps };
          }
        );
        await gssp(gsspCtx());
        expect(fn).toHaveBeenCalledWith(["A", "B", "C"]);
      });
    });
    describe("例外処理", () => {
      test("HttpError が throw された時、props（ErrResponse）が返ること", async () => {
        const gssp = await combineGssp(
          async () => {
            throw new NotFoundError();
          },
          async () => ({ props: exampleProps })
        );
        const res = await gssp(gsspCtx());
        expect(res).toMatchObject({
          props: {
            data: null,
            err: errors["NOT_FOUND"],
            status: 404,
          },
        });
      });
      test("RedirectError が throw された時、redirect が返ること", async () => {
        const gssp = await combineGssp(
          async () => {
            throw new RedirectError({ permanent: false, destination: "/" });
          },
          async () => ({ props: exampleProps })
        );
        const res = await gssp(gsspCtx());
        expect(res).toMatchObject({
          redirect: {
            basePath: undefined,
            permanent: false,
            destination: "/",
          },
        });
      });
      test("AssertsError が throw された時、props（ErrResponse）が返ること", async () => {
        const gssp = await combineGssp(
          async () => {
            throw new AssertsError();
          },
          async () => ({ props: exampleProps })
        );
        const res = await gssp(gsspCtx());
        expect(res).toMatchObject({
          props: {
            data: null,
            err: errors["INTERNAL_SERVER"],
            status: 500,
          },
        });
      });
      test("不明な Error が throw された時、リスローすること", async () => {
        class UnknownError extends Error {}
        const gssp = await combineGssp(
          async () => {
            throw new UnknownError();
          },
          async () => ({ props: exampleProps })
        );
        try {
          await gssp(gsspCtx());
          throw new Error();
        } catch (err) {
          expect(err).toBeInstanceOf(UnknownError);
        }
      });
    });
  });
});
