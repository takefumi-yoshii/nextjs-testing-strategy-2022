import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./Error.stories";

const { Default } = composeStories(stories);

describe("src/components/templates/Error/Error.test.tsx", () => {
  test("main ランドマークを1つ識別できること", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("main")).toBeInTheDocument();
  });
});
