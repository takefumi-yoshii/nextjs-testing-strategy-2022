import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./BasicHeader.stories";

const { Default } = composeStories(stories);

describe("src/components/organisms/BasicHeader/BasicHeader.test.tsx", () => {
  test("Organism である", () => {
    const { container } = render(<Default />);
    expect(container).toBeOrganism();
  });
  test("[role=banner]である", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("banner")).toBeInTheDocument();
  });
});
