import { fireEvent, render, screen } from "@testing-library/react";
import { track } from "@vercel/analytics";
import { describe, expect, it, vi } from "vitest";
import PortfolioTree from "./PortfolioTree";
import {
  ALL_FOLDER_VALUES,
  DEFAULT_EXPANDED_ITEMS,
} from "./portfolio-tree-data";

function renderTree(
  expandedItems: string[] = ALL_FOLDER_VALUES,
  onExpandedChange: (expandedItems: string[]) => void = () => {},
) {
  return render(
    <PortfolioTree
      expandedItems={expandedItems}
      onExpandedChange={onExpandedChange}
    />,
  );
}

describe("PortfolioTree", () => {
  it("renders the tree instantly with no load-in animation styles", () => {
    vi.useFakeTimers();
    try {
      const { container } = renderTree(DEFAULT_EXPANDED_ITEMS);
      // tree content is present before any timer fires
      expect(screen.getByText("career/")).toBeInTheDocument();
      // no framer-motion intro styles (opacity/transform) on the first paint
      const wrapper = container.firstElementChild;
      const style = wrapper?.getAttribute("style") ?? "";
      expect(style).not.toMatch(/opacity:\s*0/);
      expect(style).not.toMatch(/transform/);
    } finally {
      vi.useRealTimers();
    }
  });

  it("shows every section when fully expanded", () => {
    renderTree();
    for (const label of ["career/", "my tech stack/", "projects/"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("shows only the default-expanded folders with the default expansion", () => {
    renderTree(DEFAULT_EXPANDED_ITEMS);
    // trigger of a folder inside the default-expanded job-title folder
    expect(screen.getByText("career/")).toBeInTheDocument();
    // nested inside the collapsed career folder
    expect(screen.queryByText(/airgoods • software engineer/)).toBeNull();
    // nested inside the collapsed tech stack folder
    expect(screen.queryByText("typescript")).toBeNull();
  });

  it("reports the toggled expansion when a folder is clicked", () => {
    const onExpandedChange = vi.fn();
    renderTree(DEFAULT_EXPANDED_ITEMS, onExpandedChange);
    fireEvent.click(screen.getByText("career/"));
    expect(onExpandedChange).toHaveBeenCalledWith([
      ...DEFAULT_EXPANDED_ITEMS,
      "career",
    ]);
  });

  it("reports the toggled expansion when an expanded folder is collapsed", () => {
    const onExpandedChange = vi.fn();
    renderTree(DEFAULT_EXPANDED_ITEMS, onExpandedChange);
    fireEvent.click(screen.getByText(/full stack web developer/));
    expect(onExpandedChange).toHaveBeenCalledWith(["evan-mavis"]);
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
    renderTree();
    fireEvent.click(screen.getAllByRole("link", { name })[0]);
    expect(track).toHaveBeenCalledWith(event);
  });

  it("links the email entry to a mailto address", () => {
    renderTree();
    const email = screen.getAllByRole("link", { name: "email" })[0];
    expect(email.getAttribute("href")).toMatch(/^mailto:/);
  });
});
