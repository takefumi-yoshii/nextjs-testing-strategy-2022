import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./BasicHeader.stories";

const { Default } = composeStories(stories);

describe("src/components/organisms/BasicHeader/BasicHeader.test.tsx", () => {
  test("[role=banner]であること", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("banner")).toBeInTheDocument();
  });
});
