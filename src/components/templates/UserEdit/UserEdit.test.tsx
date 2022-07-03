import { updateUserHandler } from "@/services/api/users/[id]/mock";
import { setupMockServer } from "@/tests/jest";
import { storyHandlers } from "@/tests/storybook";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import singletonRouter from "next/router";
import * as stories from "./UserEdit.stories";
import { actualData, typeData } from "./UserEdit.stories";

const { Default, SucceedPost, ServerError } = composeStories(stories);

describe("src/components/templates/UserEdit/UserEdit.test.tsx", () => {
  const server = setupMockServer(updateUserHandler());
  const user = userEvent.setup();
  test("Template である", () => {
    const { container } = render(<Default />);
    expect(container).toBeTemplate();
  });
  describe("入力フォーム", () => {
    test("正常入力値で送信すると、API が呼ばれる", async () => {
      const mock = jest.fn();
      server.use(updateUserHandler({ mock }));
      const { getByRole } = render(<Default />);
      await typeData(getByRole);
      await user.click(getByRole("button", { name: "送信する" }));
      await waitFor(() =>
        expect(mock).toHaveBeenCalledWith(expect.objectContaining(actualData))
      );
    });
    test("正常入力値で送信した場合、成功した旨が表示され、ユーザー詳細画面に遷移する", async () => {
      server.use(...storyHandlers(SucceedPost));
      const { container, findByRole } = render(<SucceedPost />);
      await SucceedPost.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "ユーザーの編集に成功しました"
      );
      expect(singletonRouter).toMatchObject({ asPath: "/users/1" });
    });
    test("エラーが返ってきた場合、エラーが表示される", async () => {
      server.use(...storyHandlers(ServerError));
      const { container, findByRole } = render(<ServerError />);
      await ServerError.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "ユーザーの編集に失敗しました"
      );
    });
  });
});
