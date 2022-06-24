import { errors } from "@/errors";
import { postLoginHandler } from "@/services/api/login/mock";
import { setupMockServer } from "@/tests/jest";
import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import * as stories from "./Login.stories";

const { Default } = composeStories(stories);

describe("src/components/templates/Login/Login.test.tsx", () => {
  test("main ランドマークを1つ識別できること", () => {
    const { getByRole } = render(<Default />);
    const main = getByRole("main");
    expect(main).toBeInTheDocument();
  });
  describe("フォーム機能", () => {
    const email = "test.user_1@example.com";
    const password = "xxx-xxxxxxxxxx";
    const mock = jest.fn();
    const server = setupMockServer(postLoginHandler({ mock }));
    test("ログインボタンを押下すると、ログインAPIが呼ばれること", async () => {
      const { getByRole, getByLabelText } = render(<Default />);
      userEvent.type(getByRole("textbox", { name: "メールアドレス" }), email);
      userEvent.type(getByLabelText("パスワード"), password);
      userEvent.click(getByRole("button", { name: "ログイン" }));
      await waitFor(() =>
        expect(mock).toHaveBeenCalledWith({ email, password })
      );
    });
    test("サーバーエラーが発生した時、ログアウトに失敗した旨が表示されること", async () => {
      window.alert = jest.fn();
      server.use(postLoginHandler({ err: errors["INTERNAL_SERVER"] }));
      const { getByRole, getByLabelText } = render(<Default />);
      userEvent.type(getByRole("textbox", { name: "メールアドレス" }), email);
      userEvent.type(getByLabelText("パスワード"), password);
      userEvent.click(getByRole("button", { name: "ログイン" }));
      await waitFor(() =>
        expect(window.alert).toHaveBeenCalledWith("ログインに失敗しました")
      );
    });
  });
});
