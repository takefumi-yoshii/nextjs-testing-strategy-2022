import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import * as stories from "./UserForm.stories";

const { Default, EmptyPost, InvalidInputs, EditUser } = composeStories(stories);

describe("src/components/organisms/UserForm/UserForm.test.tsx", () => {
  test("Organism である", () => {
    const { container } = render(<Default />);
    expect(container).toBeOrganism();
  });
  test("form が title 由来のアクセシブルネームで識別できる", () => {
    const { getByRole } = render(<Default />);
    const form = getByRole("form", { name: "ユーザー作成" });
    expect(form).toBeInTheDocument();
  });
  test("空で送信した場合、入力を促すエラーメッセージが表示される", async () => {
    const { container, getByRole } = render(<EmptyPost />);
    await EmptyPost.play({ canvasElement: container });
    await waitFor(() => {
      expect(getByRole("textbox", { name: "ユーザー名" })).toHaveErrorMessage(
        "ユーザー名を入力してください"
      );
    });
    expect(getByRole("textbox", { name: "メールアドレス" })).toHaveErrorMessage(
      "メールアドレスを入力してください"
    );
  });
  test("不正な文字列で送信した場合、バリデーションエラーメッセージが表示される", async () => {
    const { container, getByRole } = render(<InvalidInputs />);
    await InvalidInputs.play({ canvasElement: container });
    await waitFor(() => {
      expect(
        getByRole("textbox", { name: "メールアドレス" })
      ).toHaveErrorMessage("不正なメールアドレス形式です");
    });
  });
  test("ユーザー編集の場合、初期値が入力されている", async () => {
    const { getByRole } = render(<EditUser />);
    const textbox = getByRole("form", { name: "ユーザー編集" });
    expect(textbox).toBeInTheDocument();
    expect(getByRole("textbox", { name: "ユーザー名" })).toHaveValue(
      "鈴木 次郎"
    );
    expect(getByRole("textbox", { name: "メールアドレス" })).toHaveValue(
      "jiro.suzuki@example.com"
    );
  });
});
