import { createUserHandler } from "@/services/api/users/mock";
import { setupMockServer } from "@/tests/jest";
import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, within } from "@testing-library/react";
import singletonRouter from "next/router";
import * as stories from "./Top.stories";

const { Default } = composeStories(stories);

describe("src/components/templates/Top/Top.test.tsx", () => {
  setupMockServer(createUserHandler());
  test("main ランドマークを1つ識別できること", () => {
    const { getByRole } = render(<Default />);
    const main = getByRole("main");
    expect(main).toBeInTheDocument();
  });
  test.each([
    { name: "ユーザー一覧", asPath: "/users" },
    { name: "投稿一覧", asPath: "/posts" },
  ])("$name リンクを押下すると $asPath に遷移する", ({ name, asPath }) => {
    const { getByRole } = render(<Default />);
    const region = getByRole("region", { name });
    userEvent.click(within(region).getByRole("link"));
    expect(singletonRouter).toMatchObject({ asPath });
  });
});
