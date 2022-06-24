import { getUserHandler } from "@/services/api.example.com/users/[id]/mock";
import { assertHasProps, gsspCtx, setupMockServer } from "@/tests/jest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page, { getServerSideProps } from "./index.page";

describe("src/pages/users/[id]/index.test.tsx", () => {
  describe("getServerSideProps", () => {
    setupMockServer(getUserHandler());
    test("400:非数", async () => {
      const res = await getServerSideProps(gsspCtx({ query: { id: "abc" } }));
      assertHasProps(res);
      render(<Page {...res.props} />);
      expect(screen.getByRole("heading", { name: "400" })).toBeInTheDocument();
    });
    test("302:未ログイン", async () => {
      const res = await getServerSideProps(
        gsspCtx(undefined, undefined, false)
      );
      expect(res).toMatchObject({
        redirect: { basePath: undefined, destination: "/", permanent: false },
      });
    });
    test("200", async () => {
      const res = await getServerSideProps(gsspCtx({ query: { id: "123" } }));
      assertHasProps(res);
      render(<Page {...res.props} />);
      expect(
        screen.getByRole("heading", { name: "ユーザー詳細" })
      ).toBeInTheDocument();
    });
  });
});
