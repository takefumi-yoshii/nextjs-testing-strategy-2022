import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { ByRoleOptions, render } from "@testing-library/react";
import * as stories from "./TextareaWithTitle.stories";

const { Default, HasDescription, HasError, FullProps } =
  composeStories(stories);

describe("src/components/molecules/TextareaWithTitle/TextareaWithTitle.test.tsx", () => {
  const options: ByRoleOptions = { name: "本文" };
  test("Molecule である", () => {
    const { container } = render(<Default />);
    expect(container).toBeMolecule();
  });
  test("labeltext が textbox のアクセシブルネームである", () => {
    const { getByRole } = render(<Default />);
    const textbox = getByRole("textbox", options);
    expect(textbox).toBeInTheDocument();
  });
  test("description で textbox が識別されている", () => {
    const { getByRole } = render(<HasDescription />);
    const textbox = getByRole("textbox", options);
    expect(textbox).toHaveAccessibleDescription("本文を入力してください");
  });
  test("error で textbox が識別されている", () => {
    const { getByRole } = render(<HasError />);
    const textbox = getByRole("textbox", options);
    expect(textbox).toHaveErrorMessage("使用できない文字があります");
    expect(textbox).toBeInvalid();
  });
  test("description と error で textbox が識別されている", () => {
    const { getByRole } = render(<FullProps />);
    const textbox = getByRole("textbox", options);
    expect(textbox).toHaveAccessibleDescription("本文を入力してください");
    expect(textbox).toHaveErrorMessage("使用できない文字があります");
  });
});
