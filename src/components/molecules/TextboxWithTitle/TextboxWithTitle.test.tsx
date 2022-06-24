import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { ByRoleOptions, render } from "@testing-library/react";
import * as stories from "./TextboxWithTitle.stories";

const { Default, HasDescription, HasError, FullProps } =
  composeStories(stories);

describe("src/components/TextboxWithTitle/TextboxWithTitle.test.tsx", () => {
  const options: ByRoleOptions = { name: "お名前" };
  test("labeltext が textbox のアクセシブルネームであること", () => {
    const { getByRole } = render(<Default />);
    const textbox = getByRole("textbox", options);
    expect(textbox).toBeInTheDocument();
  });
  test("description で textbox が識別されていること", () => {
    const { getByRole } = render(<HasDescription />);
    const textbox = getByRole("textbox", options);
    expect(textbox).toHaveAccessibleDescription("姓名を入力してください");
  });
  test("error で textbox が識別されていること", () => {
    const { getByRole } = render(<HasError />);
    const textbox = getByRole("textbox", options);
    expect(textbox).toHaveErrorMessage("入力エラーがあります");
    expect(textbox).toBeInvalid();
  });
  test("description と error で textbox が識別されていること", () => {
    const { getByRole } = render(<FullProps />);
    const textbox = getByRole("textbox", options);
    expect(textbox).toHaveAccessibleDescription("姓名を入力してください");
    expect(textbox).toHaveErrorMessage("入力エラーがあります");
  });
});
