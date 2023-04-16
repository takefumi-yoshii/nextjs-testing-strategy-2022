import { updatePostHandler } from "@/services/api/posts/[id]/mock";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import singletonRouter from "next/router";
import * as stories from "./PostEdit.stories";
import { actualData, typeData } from "./PostEdit.stories";

const { Default, SucceedPost, ServerError } = composeStories(stories);
const server = setupMockServer();
const user = userEvent.setup();

describe("src/components/templates/PostEdit/PostEdit.test.tsx", () => {
  test("Template である", () => {
    const { container } = render(<Default />);
    expect(container).toBeTemplate();
  });
  describe("入力フォーム", () => {
    test("正常入力値で送信すると、API が呼ばれる", async () => {
      const mock = jest.fn();
      const { getByRole } = render(<Default />);
      server.use(updatePostHandler({ mock }));
      await typeData(getByRole);
      await user.click(getByRole("button", { name: "送信する" }));
      await waitFor(() =>
        expect(mock).toHaveBeenCalledWith(expect.objectContaining(actualData))
      );
    });
    test("正常入力値で送信した場合、成功した旨が表示され、投稿詳細画面に遷移する", async () => {
      server.use(...SucceedPost?.parameters?.msw.handlers);
      const { container, findByRole } = render(<SucceedPost />);
      await SucceedPost.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "投稿の編集に成功しました"
      );
      expect(singletonRouter).toMatchObject({ asPath: "/posts/1" });
    });
    test("エラーが返ってきた場合、エラーが表示される", async () => {
      server.use(...ServerError?.parameters?.msw.handlers);
      const { container, findByRole } = render(<ServerError />);
      await ServerError.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "投稿の編集に失敗しました"
      );
    });
  });
});
