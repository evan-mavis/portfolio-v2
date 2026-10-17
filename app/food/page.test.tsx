import { render, screen } from "@testing-library/react";
import { track } from "@vercel/analytics";
import { describe, expect, it, vi } from "vitest";
import FoodPage from "./page";

describe("food page", () => {
  it("renders the ranking introduction and tracks the page view", () => {
    vi.mocked(track).mockClear();
    render(<FoodPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "my food trip to bali, vietnam, and japan... ranked!",
      }),
    ).toBeInTheDocument();
    expect(track).toHaveBeenCalledExactlyOnceWith("food_page_view");
    expect(screen.getByRole("link", { name: "back" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
