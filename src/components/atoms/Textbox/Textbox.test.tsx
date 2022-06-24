import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./Textbox.stories";

const { Default, Spinbutton } = composeStories(stories);

describe("src/components/Textbox/Textbox.test.tsx", () => {
  test("[role=textbox]であること", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });
  test("[role=spinbutton]であること", () => {
    const { getByRole } = render(<Spinbutton />);
    expect(getByRole("spinbutton")).toBeInTheDocument();
  });
});
