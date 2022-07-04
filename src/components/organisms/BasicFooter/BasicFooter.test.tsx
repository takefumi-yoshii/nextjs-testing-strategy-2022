import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./BasicFooter.stories";

const { Default } = composeStories(stories);

describe("src/components/organisms/BasicFooter/BasicFooter.test.tsx", () => {
  test("Organism である", () => {
    const { container } = render(<Default />);
    expect(container).toBeOrganism();
  });
  test("[role=contentinfo]である", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("contentinfo")).toBeInTheDocument();
  });
});
