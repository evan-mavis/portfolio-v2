import { fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
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
    expect(screen.getByRole("button", { name: "toggle theme" })).toBeDisabled();
  });

  it.each([
    ["system", "dark", "light"],
    ["light", "light", "dark"],
    ["dark", "dark", "light"],
  ])("switches from %s to %s", (theme, resolved, next) => {
    mockTheme(theme, resolved);
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "toggle theme" }));
    expect(setTheme).toHaveBeenCalledWith(next);
  });

  // a theme picked before hydration must not change the server markup.
  it("renders the identical placeholder on first render for any theme state", () => {
    mockTheme(undefined);
    const unresolvedHtml = renderToString(<ThemeToggle />);

    mockTheme("system", "dark");
    const resolvedHtml = renderToString(<ThemeToggle />);

    expect(resolvedHtml).toBe(unresolvedHtml);
    expect(resolvedHtml).toContain("disabled");
  });
});
