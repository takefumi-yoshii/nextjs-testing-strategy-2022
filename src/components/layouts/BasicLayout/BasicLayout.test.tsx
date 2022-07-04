import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./BasicLayout.stories";
import { BasicLayoutPortal } from "./BasicLayoutPortal";

const { Default } = composeStories(stories);

describe("src/components/layouts/BasicLayout/BasicLayout.test.tsx", () => {
  test("主要ランドマークを識別できる", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("banner")).toBeInTheDocument();
    expect(getByRole("complementary")).toBeInTheDocument();
    expect(getByRole("contentinfo")).toBeInTheDocument();
  });

  test("#portal-root 要素が存在しない場合、例外を throw する", () => {
    expect(() => BasicLayoutPortal({ children: null })).toThrow();
  });
});
