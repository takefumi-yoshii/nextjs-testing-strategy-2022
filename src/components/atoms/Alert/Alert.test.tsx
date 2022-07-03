import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import * as stories from "./Alert.stories";

const { Success, Fail } = composeStories(stories);

describe("src/components/atoms/Alert/Alert.test.tsx", () => {
  test("Atom である", () => {
    const { container } = render(<Success />);
    expect(container).toBeAtom();
  });
  test("[role=alert]である", () => {
    const { getByRole } = render(<Success />);
    expect(getByRole("alert")).toHaveTextContent("作成しました");
  });
  test("失敗時の見た目は異なる", () => {
    const { getByRole } = render(<Fail />);
    expect(getByRole("alert")).toHaveTextContent("エラーが発生しました");
  });
});
