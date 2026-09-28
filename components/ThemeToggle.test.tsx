import { fireEvent, render, screen } from "@testing-library/react";
import { useTheme } from "next-themes";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

vi.mock("next-themes", () => ({ useTheme: vi.fn() }));

const setTheme = vi.fn();

function mockTheme(theme: string | undefined, resolvedTheme?: string) {
  vi.mocked(useTheme).mockReturnValue({
    theme,
    resolvedTheme,
    setTheme,
    themes: [],
  });
}

describe("ThemeToggle", () => {
  beforeEach(() => setTheme.mockClear());

  it("is disabled until the theme resolves on the client", () => {
    mockTheme(undefined);
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Toggle theme" })).toBeDisabled();
  });

  it.each([
    ["system", "dark", "light"],
    ["light", "light", "dark"],
    ["dark", "dark", "light"],
  ])("switches from %s to %s", (theme, resolved, next) => {
    mockTheme(theme, resolved);
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));
    expect(setTheme).toHaveBeenCalledWith(next);
  });
});
