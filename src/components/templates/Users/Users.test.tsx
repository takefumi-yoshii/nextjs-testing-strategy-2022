import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import singletonRouter from "next/router";
import * as stories from "./Users.stories";

const { Default } = composeStories(stories);

describe("src/components/templates/Users/Users.test.tsx", () => {
  setupMockServer();
  const user = userEvent.setup();
  test("main ランドマークを1つ識別できること", () => {
    const { getByRole } = render(<Default />);
    const main = getByRole("main");
    expect(main).toBeInTheDocument();
  });
  test("「詳細」リンクを押下すると、詳細画面に遷移すること", async () => {
    const { getByRole } = render(<Default />);
    const row = getByRole("row", { name: "test.user_1" });
    await user.click(within(row).getByRole("link", { name: "詳細" }));
    expect(singletonRouter).toMatchObject({ asPath: "/users/1" });
  });
  test("「ユーザー新規作成」ボタンを押下すると、ユーザー新規作成画面に遷移すること", async () => {
    const { getByRole } = render(<Default />);
    await user.click(getByRole("button", { name: "新規作成" }));
    expect(singletonRouter).toMatchObject({ asPath: "/users/new" });
  });
});
