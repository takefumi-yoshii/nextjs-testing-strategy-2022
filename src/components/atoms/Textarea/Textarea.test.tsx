import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./Textarea.stories";

const { Default } = composeStories(stories);

describe("src/components/atoms/Textarea/Textarea.test.tsx", () => {
  test("[role=textbox]であること", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });
});
