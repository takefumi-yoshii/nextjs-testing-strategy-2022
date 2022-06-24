import { errors } from "@/errors";
import { getPostsHandler } from "@/services/api.example.com/posts/mock";
import { assertHasProps, gsspCtx, setupMockServer } from "@/tests/jest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page, { getServerSideProps } from "./index.page";

describe("src/pages/posts/index.test.tsx", () => {
  describe("getServerSideProps", () => {
    const server = setupMockServer(getPostsHandler());
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
        screen.getByRole("heading", { name: "投稿一覧" })
      ).toBeInTheDocument();
    });
    test("500", async () => {
      server.use(getPostsHandler({ err: errors["INTERNAL_SERVER"] }));
      const res = await getServerSideProps(gsspCtx());
      assertHasProps(res);
      render(<Page {...res.props} />);
      expect(screen.getByRole("heading", { name: "500" })).toBeInTheDocument();
    });
  });
});
