import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import singletonRouter from "next/router";
import * as stories from "./BasicAside.stories";

const { Default } = composeStories(stories);

describe("src/components/organisms/BasicAside/BasicAside.test.tsx", () => {
  const user = userEvent.setup();
  test("Organism である", () => {
    const { container } = render(<Default />);
    expect(container).toBeOrganism();
  });
  test("[role=complementary]である", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("complementary")).toBeInTheDocument();
  });
  test("[role=navigation]を保持している", () => {
    const { getByRole } = render(<Default />);
    expect(
      getByRole("navigation", { name: "メインナビゲーション" })
    ).toBeInTheDocument();
  });
  test.each([
    { name: "Top", asPath: "/" },
    { name: "Users", asPath: "/users" },
    { name: "Posts", asPath: "/posts" },
  ])(
    "$name リンクを押下すると $asPath に遷移する",
    async ({ name, asPath }) => {
      const { getByRole } = render(<Default />);
      await user.click(getByRole("link", { name }));
      expect(singletonRouter).toMatchObject({ asPath });
    }
  );
  test("「ログアウト」リンクを押下すると、トップ画面に遷移する", async () => {
    const { getByRole } = render(<Default />);
    await user.click(getByRole("link", { name: "ログアウト" }));
    expect(window.location.href).toBe("http://localhost/");
  });
});
