import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ButtonsRow from "./ButtonsRow";
import { useTreeStateContext } from "./TreeStateProvider";

vi.mock("./ThemeToggle", () => ({ ThemeToggle: () => null }));
vi.mock("./TreeStateProvider", () => ({ useTreeStateContext: vi.fn() }));

function mockTreeState(
  allExpanded: boolean,
  handleAllExpandedChange: (expanded: boolean) => void = () => {},
) {
  vi.mocked(useTreeStateContext).mockReturnValue({
    expandedItems: [],
    allExpanded,
    handleExpandedItemsChange: () => {},
    handleAllExpandedChange,
  });
}

describe("ButtonsRow", () => {
  it("gives the expand-all toggle an accessible name", () => {
    mockTreeState(false);
    render(<ButtonsRow />);
    expect(
      screen.getByRole("button", { name: "expand all folders" }),
    ).toBeInTheDocument();
  });

  it("reflects the expanded state on the toggle", () => {
    mockTreeState(true);
    render(<ButtonsRow />);
    expect(
      screen.getByRole("button", { name: "expand all folders" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("requests expansion when the collapsed toggle is pressed", () => {
    const handleAllExpandedChange = vi.fn();
    mockTreeState(false, handleAllExpandedChange);
    render(<ButtonsRow />);
    fireEvent.click(screen.getByRole("button", { name: "expand all folders" }));
    expect(handleAllExpandedChange).toHaveBeenCalledWith(true);
  });
});
