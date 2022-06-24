import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./AnchorButton.stories";

const { Default, Disabled } = composeStories(stories);

describe("src/components/atoms/AnchorButton/AnchorButton.test.tsx", () => {
  const options = { name: "送信する" };
  test("[role=button]であること", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("button", options)).toBeInTheDocument();
  });
  test("[aria-disabled=true]であること", () => {
    const { getByRole } = render(<Disabled />);
    // SEE: https://github.com/testing-library/jest-dom/issues/144
    expect(getByRole("button", options)).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  });
});
