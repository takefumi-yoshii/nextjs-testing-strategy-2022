import { createUserHandler } from "@/services/api/users/mock";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, within } from "@testing-library/react";
import * as stories from "./Table.stories";

const { Default } = composeStories(stories);

describe("src/components/molecules/Table/Table.test.tsx", () => {
  setupMockServer(createUserHandler());

  test("Molecule である", () => {
    const { container } = render(<Default />);
    expect(container).toBeMolecule();
  });
  test("[role=table]である", () => {
    const { getByRole } = render(<Default />);
    expect(getByRole("table")).toBeInTheDocument();
  });
  test("aria-label で特定の cell にアクセスできる", () => {
    const { getByRole } = render(<Default />);
    const row = within(getByRole("row", { name: "row2" }));
    const cell = row.getByRole("cell", { name: "learnmore" });
    const link = within(cell).getByRole("link");
    expect(link).toHaveAttribute("href", "/products/2");
  });
});
