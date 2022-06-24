import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import singletonRouter from "next/router";
import * as stories from "./BasicAside.stories";

const { Default } = composeStories(stories);

describe("src/components/organisms/BasicFooter/BasicFooter.test.tsx", () => {
  test("[role=complementary]であること", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("complementary")).toBeInTheDocument();
  });
  test("[role=navigation]を保持していること", () => {
    const { getByRole } = render(<Default />);
    expect(
      getByRole("navigation", { name: "メインナビゲーション" })
    ).toBeInTheDocument();
  });
  test.each([
    { name: "Top", asPath: "/" },
    { name: "Users", asPath: "/users" },
    { name: "Posts", asPath: "/posts" },
  ])("$name リンクを押下すると $asPath に遷移する", ({ name, asPath }) => {
    const { getByRole } = render(<Default />);
    userEvent.click(getByRole("link", { name }));
    expect(singletonRouter).toMatchObject({ asPath });
  });
  test("「ログアウト」リンクを押下すると、トップ画面に遷移すること", () => {
    const { getByRole } = render(<Default />);
    userEvent.click(getByRole("link", { name: "ログアウト" }));
    expect(window.location.href).toBe("http://localhost/");
  });
});
