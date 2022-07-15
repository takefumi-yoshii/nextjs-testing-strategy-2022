import { createUserHandler } from "@/services/api/users/mock";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getWorker } from "msw-storybook-addon";
import * as stories from "./UsersNew.stories";
import { actualData, typeData } from "./UsersNew.stories";

const { Default, SucceedPost, ServerError } = composeStories(stories);
const server = getWorker();
const user = userEvent.setup();

describe("src/components/templates/UsersNew/UsersNew.test.tsx", () => {
  test("Template である", () => {
    const { container } = render(<Default />);
    expect(container).toBeTemplate();
  });
  describe("入力フォーム", () => {
    test("正常入力値で送信すると、API が呼ばれる", async () => {
      const mock = jest.fn();
      const { getByRole } = render(<Default />);
      server.use(createUserHandler({ mock }));
      await typeData(getByRole);
      await user.click(getByRole("button", { name: "送信する" }));
      await waitFor(() =>
        expect(mock).toHaveBeenCalledWith(expect.objectContaining(actualData))
      );
    });
    test("正常入力値で送信した場合、成功した旨が表示される", async () => {
      const { container, findByRole } = render(<SucceedPost />);
      await SucceedPost.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "ユーザーの作成に成功しました"
      );
    });
    test("エラーが返ってきた場合、エラーが表示される", async () => {
      const { container, findByRole } = render(<ServerError />);
      await ServerError.play({ canvasElement: container });
      expect(await findByRole("alert")).toHaveTextContent(
        "ユーザーの作成に失敗しました"
      );
    });
  });
});
