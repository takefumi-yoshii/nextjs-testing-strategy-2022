import { getPostsHandler } from "@/services/api.example.com/posts/mock";
import { assertHasProps, gsspCtx, setupMockServer } from "@/tests/jest";
import "@/tests/mock/crypto";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page, { getServerSideProps } from "./new.page";

describe("src/pages/posts/new.test.tsx", () => {
  describe("getServerSideProps", () => {
    setupMockServer(getPostsHandler());
    test("302:未ログイン", async () => {
      const res = await getServerSideProps(
        gsspCtx(undefined, undefined, false)
      );
      expect(res).toMatchObject({
        redirect: { basePath: undefined, destination: "/", permanent: false },
      });
    });
    test("200", async () => {
      const res = await getServerSideProps(gsspCtx());
      assertHasProps(res);
      render(<Page {...res.props} />);
      expect(
        screen.getByRole("heading", { name: "投稿作成" })
      ).toBeInTheDocument();
    });
  });
});
