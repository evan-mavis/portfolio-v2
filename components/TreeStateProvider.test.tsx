import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ButtonsRow from "./ButtonsRow";
import PortfolioTree from "./PortfolioTree";
import { TreeStateProvider, useTreeStateContext } from "./TreeStateProvider";
import { ALL_FOLDER_VALUES } from "./portfolio-tree-data";
import { TREE_STORAGE_KEY } from "@/lib/tree-state";

vi.mock("./ThemeToggle", () => ({ ThemeToggle: () => null }));

function renderIslands() {
  return render(
    <TreeStateProvider>
      <ButtonsRow />
      <PortfolioTree />
    </TreeStateProvider>,
  );
}

describe("TreeStateProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shares expand-all state between the toggle and the tree", () => {
    renderIslands();
    // nested inside the collapsed-by-default career folder
    expect(screen.queryByText(/airgoods • software engineer/)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "expand all folders" }));

    expect(
      screen.getByText(/airgoods • software engineer/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "expand all folders" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      JSON.parse(window.localStorage.getItem(TREE_STORAGE_KEY) ?? "{}"),
    ).toEqual({ expanded: ALL_FOLDER_VALUES, allExpanded: true });
  });

  it("collapses every folder when the expand-all toggle is released", () => {
    renderIslands();
    const toggle = screen.getByRole("button", { name: "expand all folders" });
    fireEvent.click(toggle);
    expect(screen.getByText("career/")).toBeInTheDocument();

    fireEvent.click(toggle);

    expect(screen.queryByText("career/")).toBeNull();
    expect(
      JSON.parse(window.localStorage.getItem(TREE_STORAGE_KEY) ?? "{}"),
    ).toEqual({ expanded: [], allExpanded: false });
  });

  it("restores the stored expansion after mount", () => {
    window.localStorage.setItem(
      TREE_STORAGE_KEY,
      JSON.stringify({ expanded: ALL_FOLDER_VALUES, allExpanded: true }),
    );
    renderIslands();
    expect(
      screen.getByText(/airgoods • software engineer/),
    ).toBeInTheDocument();
  });

  it("throws when a consumer reads the context outside the provider", () => {
    function Consumer() {
      useTreeStateContext();
      return null;
    }
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    try {
      expect(() => render(<Consumer />)).toThrow(/TreeStateProvider/);
    } finally {
      consoleError.mockRestore();
    }
  });
});
