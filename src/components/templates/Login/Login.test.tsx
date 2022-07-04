import { errors } from "@/errors";
import { postLoginHandler } from "@/services/api/login/mock";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as stories from "./Login.stories";

const { Default } = composeStories(stories);

describe("src/components/templates/Login/Login.test.tsx", () => {
  const user = userEvent.setup();
  test("Template である", () => {
    const { container } = render(<Default />);
    expect(container).toBeTemplate();
  });
  describe("フォーム機能", () => {
    const email = "test.user_1@example.com";
    const password = "xxx-xxxxxxxxxx";
    const mock = jest.fn();
    const server = setupMockServer(postLoginHandler({ mock }));
    test("ログインボタンを押下すると、ログインAPIが呼ばれる", async () => {
      const { getByRole, getByLabelText } = render(<Default />);
      await user.type(getByRole("textbox", { name: "メールアドレス" }), email);
      await user.type(getByLabelText("パスワード"), password);
      await user.click(getByRole("button", { name: "ログイン" }));
      await waitFor(() =>
        expect(mock).toHaveBeenCalledWith({ email, password })
      );
    });
    test("サーバーエラーが発生した時、ログアウトに失敗した旨が表示される", async () => {
      window.alert = jest.fn();
      server.use(postLoginHandler({ err: errors["INTERNAL_SERVER"] }));
      const { getByRole, getByLabelText } = render(<Default />);
      await user.type(getByRole("textbox", { name: "メールアドレス" }), email);
      await user.type(getByLabelText("パスワード"), password);
      await user.click(getByRole("button", { name: "ログイン" }));
      await waitFor(() =>
        expect(window.alert).toHaveBeenCalledWith("ログインに失敗しました")
      );
    });
  });
});
