import { createUserHandler } from "@/services/api/users/mock";
import { setupMockServer } from "@/tests/jest";
import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import singletonRouter from "next/router";
import * as stories from "./Post.stories";

const { Default } = composeStories(stories);

describe("src/components/templates/Post/Post.test.tsx", () => {
  setupMockServer(createUserHandler());
  test("main ランドマークを1つ識別できること", () => {
    const { getByRole } = render(<Default />);
    const main = getByRole("main");
    expect(main).toBeInTheDocument();
  });
  test("編集ボタンを押下すると、編集画面に遷移すること", () => {
    const { getByRole } = render(<Default />);
    userEvent.click(getByRole("button", { name: "編集する" }));
    expect(singletonRouter).toMatchObject({ asPath: "/posts/1/edit" });
  });
});
