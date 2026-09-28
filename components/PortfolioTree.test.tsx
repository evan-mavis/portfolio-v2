import { fireEvent, render, screen } from "@testing-library/react";
import { track } from "@vercel/analytics";
import { describe, expect, it, vi } from "vitest";
import PortfolioTree from "./PortfolioTree";

describe("PortfolioTree", () => {
  it("shows every section when fully expanded", () => {
    render(<PortfolioTree isExpanded />);
    for (const label of ["career/", "my tech stack/", "projects/"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it.each([
    ["resume", "resume_click"],
    ["linkedin", "linkedin_click"],
    ["github", "github_click"],
    ["email", "email_click"],
    ["travel", "travel_page_click"],
    ["food trip to southeast asia + japan", "food_page_click"],
  ])("tracks clicks on the %s link", (name, event) => {
    vi.mocked(track).mockClear();
    render(<PortfolioTree isExpanded />);
    fireEvent.click(screen.getAllByRole("link", { name })[0]);
    expect(track).toHaveBeenCalledWith(event);
  });

  it("links the email entry to a mailto address", () => {
    render(<PortfolioTree isExpanded />);
    const email = screen.getAllByRole("link", { name: "email" })[0];
    expect(email.getAttribute("href")).toMatch(/^mailto:/);
  });
});
