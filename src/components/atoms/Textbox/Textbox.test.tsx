import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./Textbox.stories";

const { Default, Spinbutton } = composeStories(stories);

describe("src/components/Textbox/Textbox.test.tsx", () => {
  test("Atom である", () => {
    const { container } = render(<Default />);
    expect(container).toBeAtom();
  });
  test("[role=textbox]である", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });
  test("[role=spinbutton]である", () => {
    const { getByRole } = render(<Spinbutton />);
    expect(getByRole("spinbutton")).toBeInTheDocument();
  });
});
