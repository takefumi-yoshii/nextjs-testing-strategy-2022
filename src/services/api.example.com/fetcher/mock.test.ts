import { setupMockServer } from "@/tests/jest";
import { restHandlerFactory } from "./mock";

describe("src/services/api.example.com/fetcher/mock.test.ts", () => {
  describe("restHandlerFactory", () => {
    const path = "/api/example";
    const expectedData = { message: "test" };

    const fetcher = () =>
      fetch(path, {
        method: "POST",
        body: JSON.stringify(expectedData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw data;
        return data;
      });

    const createHandler = restHandlerFactory<{}, {}, { message: string }>(
      "post",
      path,
      (_, res, ctx) => res(ctx.json(expectedData))
    );

    const server = setupMockServer();

    describe("空引数でハンドラー関数を生成した場合", () => {
      test("初期設定した fixture が返ること", async () => {
        server.use(createHandler());
        const res = await fetcher();
        expect(res).toMatchObject(expectedData);
      });
    });
    describe("jest.fn を渡した場合", () => {
      const mock = jest.fn();
      test("bodyを引数にコールバックされること", async () => {
        server.use(createHandler({ mock }));
        await fetcher();
        expect(mock).toHaveBeenCalledWith(expectedData);
      });
    });
    describe("data にダミーを渡した場合", () => {
      const mockResponse = { message: "OK" };
      test("bodyを引数にコールバックされること", async () => {
        server.use(createHandler({ data: mockResponse }));
        const res = await fetcher();
        expect(res).toMatchObject(mockResponse);
      });
    });
    describe("err にダミーを渡した場合", () => {
      const mockResponse = { message: "NG", status: 400 };
      test("bodyを引数にコールバックされること", async () => {
        server.use(createHandler({ err: mockResponse }));
        await fetcher().catch((data) => {
          expect(data).toMatchObject(mockResponse);
        });
      });
    });
  });
});
