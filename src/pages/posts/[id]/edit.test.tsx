import { getPostHandler } from "@/services/api.example.com/posts/[id]/mock";
import { assertHasProps, gsspCtx, setupMockServer } from "@/tests/jest";
import "@/tests/mock/crypto";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page, { getServerSideProps } from "./edit.page";

describe("src/pages/posts/[id]/edit.test.tsx", () => {
  describe("getServerSideProps", () => {
    setupMockServer(getPostHandler());
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
        screen.getByRole("heading", { name: "投稿編集" })
      ).toBeInTheDocument();
    });
  });
});
