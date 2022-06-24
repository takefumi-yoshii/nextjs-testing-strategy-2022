import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./BasicFooter.stories";

const { Default } = composeStories(stories);

describe("src/components/organisms/BasicFooter/BasicFooter.test.tsx", () => {
  test("[role=contentinfo]であること", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("contentinfo")).toBeInTheDocument();
  });
});
