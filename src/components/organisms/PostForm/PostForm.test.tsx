import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import * as stories from "./PostForm.stories";

const { Default, EmptyPost, EditUser } = composeStories(stories);

describe("src/components/organisms/PostForm/PostForm.test.tsx", () => {
  test("Organism である", () => {
    const { container } = render(<Default />);
    expect(container).toBeOrganism();
  });
  test("form が title 由来のアクセシブルネームで識別できる", () => {
    const { getByRole } = render(<Default />);
    const form = getByRole("form", { name: "投稿作成" });
    expect(form).toBeInTheDocument();
  });
  test("空で送信した場合、入力を促すエラーメッセージが表示される", async () => {
    const { container, getByRole, getByLabelText } = render(<EmptyPost />);
    await EmptyPost.play({ canvasElement: container });
    await waitFor(() => {
      expect(getByRole("textbox", { name: "タイトル" })).toHaveErrorMessage(
        "タイトルを入力してください"
      );
    });
    expect(getByRole("textbox", { name: "著者" })).toHaveErrorMessage(
      "著者を入力してください"
    );
  });
  test("ユーザー編集の場合、初期値が入力されている", async () => {
    const { getByRole } = render(<EditUser />);
    const textbox = getByRole("form", { name: "投稿編集" });
    expect(textbox).toBeInTheDocument();
    expect(getByRole("textbox", { name: "タイトル" })).toHaveValue(
      "Lorem Ipsum"
    );
    expect(getByRole("textbox", { name: "著者" })).toHaveValue("takepepe");
  });
});
