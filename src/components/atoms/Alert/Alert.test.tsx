import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./Alert.stories";

const { Success, Fail } = composeStories(stories);

describe("src/components/atoms/Alert/Alert.test.tsx", () => {
  test("[role=alert]であること", () => {
    const { getByRole } = render(<Success />);
    expect(getByRole("alert")).toHaveTextContent("作成しました");
  });
  test("[role=alert]であること", () => {
    const { getByRole } = render(<Fail />);
    expect(getByRole("alert")).toHaveTextContent("エラーが発生しました");
  });
});
