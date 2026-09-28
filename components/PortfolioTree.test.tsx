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
    for (const label of [
      "career/",
      "tech i use/",
      "interesting stuff/",
      "frontend/",
      "backend/",
      "infra/",
      "observability/",
      "tooling/",
      "productivity/",
    ]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("no longer renders the projects folder or the wishswipe leaf", () => {
    renderTree();
    expect(screen.queryByText(/projects\//)).toBeNull();
    expect(screen.queryByText("wishswipe")).toBeNull();
    expect(screen.queryByText("my tech stack/")).toBeNull();
  });

  it("nests the tech subfolders under tech i use/", () => {
    renderTree(DEFAULT_EXPANDED_ITEMS);
    // collapsed by default: neither the folder nor its leaves are visible
    expect(screen.queryByText("tech i use/")).not.toBeNull();
    expect(screen.queryByText("backend/")).toBeNull();
    expect(screen.queryByText("inngest")).toBeNull();
  });

  it("opens meet your goals in a new tab to chain-log", () => {
    renderTree();
    const link = screen.getAllByRole("link", { name: "meet your goals" })[0];
    expect(link.getAttribute("href")).toBe("https://chain-log.app");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("opens my agentic workflow skills in a new tab to the skills repo", () => {
    renderTree();
    const link = screen.getAllByRole("link", {
      name: "my agentic workflow skills",
    })[0];
    expect(link.getAttribute("href")).toBe(
      "https://github.com/evan-mavis/skills",
    );
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("keeps beli on its own external url, distinct from the food leaf", () => {
    renderTree();
    const beliLinks = screen.getAllByRole("link", { name: "beli" });
    expect(beliLinks).toHaveLength(1);
    expect(beliLinks[0].getAttribute("href")).toBe(
      "https://beliapp.co/app/evanmavis",
    );
    expect(beliLinks[0].getAttribute("target")).toBe("_blank");
    const foodLink = screen.getAllByRole("link", {
      name: "food trip to southeast asia + japan",
    })[0];
    expect(foodLink.getAttribute("href")).toBe("/food");
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
    ["meet your goals", "meet_your_goals_click"],
    ["my agentic workflow skills", "skills_repo_click"],
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
