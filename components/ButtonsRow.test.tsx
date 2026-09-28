import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ButtonsRow from "./ButtonsRow";

vi.mock("./ThemeToggle", () => ({ ThemeToggle: () => null }));

describe("ButtonsRow", () => {
  it("gives the expand-all toggle an accessible name", () => {
    render(<ButtonsRow isExpanded={false} onExpandedChange={() => {}} />);
    expect(
      screen.getByRole("button", { name: "expand all folders" }),
    ).toBeInTheDocument();
  });

  it("reflects the expanded state on the toggle", () => {
    render(<ButtonsRow isExpanded onExpandedChange={() => {}} />);
    expect(
      screen.getByRole("button", { name: "expand all folders" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("requests expansion when the collapsed toggle is pressed", () => {
    const onExpandedChange = vi.fn();
    render(
      <ButtonsRow isExpanded={false} onExpandedChange={onExpandedChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "expand all folders" }));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
  });
});
