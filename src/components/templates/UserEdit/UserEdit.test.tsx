import { updateUserHandler } from "@/services/api/users/[id]/mock";
import { setupMockServer } from "@/tests/jest";
import { storyHandlers } from "@/tests/storybook";
import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import singletonRouter from "next/router";
import * as stories from "./UserEdit.stories";
import { actualData, typeData } from "./UserEdit.stories";

const { Default, SucceedPost, ServerError } = composeStories(stories);

describe("src/components/templates/UserEdit/UserEdit.test.tsx", () => {
  const server = setupMockServer(updateUserHandler());
  test("main ランドマークを1つ識別できること", () => {
    const { getByRole } = render(<Default />);
    const main = getByRole("main");
    expect(main).toBeInTheDocument();
  });
  describe("入力フォーム", () => {
    test("正常入力値で送信すると、API が呼ばれること", async () => {
      const mock = jest.fn();
      server.use(updateUserHandler({ mock }));
      const { getByRole } = render(<Default />);
      await typeData(getByRole);
      userEvent.click(getByRole("button", { name: "送信する" }));
      await waitFor(() =>
        expect(mock).toHaveBeenCalledWith(expect.objectContaining(actualData))
      );
    });
    test("正常入力値で送信した場合、成功した旨が表示され、ユーザー詳細画面に遷移すること", async () => {
      server.use(...storyHandlers(SucceedPost));
      const { container, findByRole } = render(<SucceedPost />);
      await SucceedPost.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "ユーザーの編集に成功しました"
      );
      expect(singletonRouter).toMatchObject({ asPath: "/users/1" });
    });
    test("エラーが返ってきた場合、エラーが表示されること", async () => {
      server.use(...storyHandlers(ServerError));
      const { container, findByRole } = render(<ServerError />);
      await ServerError.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "ユーザーの編集に失敗しました"
      );
    });
  });
});
