import { createUserHandler } from "@/services/api/users/mock";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import singletonRouter from "next/router";
import * as stories from "./User.stories";

const { Default } = composeStories(stories);

describe("src/components/templates/User/User.test.tsx", () => {
  setupMockServer(createUserHandler());
  const user = userEvent.setup();
  test("main ランドマークを1つ識別できること", () => {
    const { getByRole } = render(<Default />);
    const main = getByRole("main");
    expect(main).toBeInTheDocument();
  });
  test("編集ボタンを押下すると、編集画面に遷移すること", async () => {
    const { getByRole } = render(<Default />);
    await user.click(getByRole("button", { name: "編集する" }));
    expect(singletonRouter).toMatchObject({ asPath: "/users/1/edit" });
  });
});
