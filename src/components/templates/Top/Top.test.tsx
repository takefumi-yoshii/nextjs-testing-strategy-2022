import { createUserHandler } from "@/services/api/users/mock";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import singletonRouter from "next/router";
import * as stories from "./Top.stories";

const { Default } = composeStories(stories);

describe("src/components/templates/Top/Top.test.tsx", () => {
  setupMockServer(createUserHandler());
  const user = userEvent.setup();
  test("Template である", () => {
    const { container } = render(<Default />);
    expect(container).toBeTemplate();
  });
  test.each([
    { name: "ユーザー一覧", asPath: "/users" },
    { name: "投稿一覧", asPath: "/posts" },
  ])(
    "$name リンクを押下すると $asPath に遷移する",
    async ({ name, asPath }) => {
      const { getByRole } = render(<Default />);
      const region = getByRole("region", { name });
      await user.click(within(region).getByRole("link"));
      expect(singletonRouter).toMatchObject({ asPath });
    }
  );
});
