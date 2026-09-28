import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ButtonsRow from "./ButtonsRow";
import PortfolioTree from "./PortfolioTree";
import { TreeStateProvider, useTreeStateContext } from "./TreeStateProvider";

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
  it("shares expand-all state between the toggle and the tree", () => {
    renderIslands();
    expect(screen.queryByText(/airgoods • software engineer/)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "expand all folders" }));

    expect(
      screen.getByText(/airgoods • software engineer/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "expand all folders" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("collapses every folder when the expand-all toggle is released", () => {
    renderIslands();
    const toggle = screen.getByRole("button", { name: "expand all folders" });
    fireEvent.click(toggle);
    expect(screen.getByText("career/")).toBeInTheDocument();

    fireEvent.click(toggle);

    expect(screen.queryByText("career/")).toBeNull();
  });

  it("starts with the intro open", () => {
    renderIslands();
    expect(screen.getByText("career/")).toBeInTheDocument();
    expect(screen.queryByText(/airgoods • software engineer/)).toBeNull();
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
