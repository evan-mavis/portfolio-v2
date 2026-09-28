import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GENERATED_ICONS } from "@/lib/icons-generated";
import {
  ALL_FOLDER_VALUES,
  DEFAULT_EXPANDED_ITEMS,
  PORTFOLIO_TREE_DATA,
  type TreeFileNode,
  type TreeNode,
} from "./portfolio-tree-data";

function collectFolderValues(nodes: TreeNode[]): string[] {
  return nodes.flatMap((node) =>
    node.kind === "folder"
      ? [node.value, ...collectFolderValues(node.children)]
      : [],
  );
}

function collectChildValueGroups(nodes: TreeNode[]): string[][] {
  return nodes.flatMap((node) =>
    node.kind === "folder"
      ? [
          node.children.map((child) => child.value),
          ...collectChildValueGroups(node.children),
        ]
      : [],
  );
}

function findFolder(nodes: TreeNode[], value: string): TreeNode[] {
  for (const node of nodes) {
    if (node.kind !== "folder") continue;
    if (node.value === value) return node.children;
    const match = findFolder(node.children, value);
    if (match.length > 0) return match;
  }
  return [];
}

function findFile(nodes: TreeNode[], value: string): TreeFileNode | undefined {
  for (const node of nodes) {
    if (node.kind === "file" && node.value === value) return node;
    if (node.kind === "folder") {
      const match = findFile(node.children, value);
      if (match) return match;
    }
  }
  return undefined;
}

function labelText(label: ReactNode): string {
  const container = document.createElement("div");
  container.innerHTML = renderToStaticMarkup(<>{label}</>);
  return container.textContent ?? "";
}

function collectLabels(nodes: TreeNode[]): string[] {
  return nodes.flatMap((node) =>
    node.kind === "folder"
      ? [labelText(node.label), ...collectLabels(node.children)]
      : [labelText(node.label)],
  );
}

describe("portfolio tree data", () => {
  it("uses only lowercase characters in every tree label", () => {
    const labels = collectLabels(PORTFOLIO_TREE_DATA);
    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) {
      expect(label, `label "${label}" contains uppercase`).not.toMatch(/[A-Z]/);
    }
  });

  it("derives the folder value list from the tree data", () => {
    expect(ALL_FOLDER_VALUES).toEqual(collectFolderValues(PORTFOLIO_TREE_DATA));
  });

  it("covers every folder currently in the tree", () => {
    expect(ALL_FOLDER_VALUES).toEqual([
      "evan-mavis",
      "full-stack-web-developer",
      "career",
      "airgoods",
      "kpmg-senior",
      "kpmg-fulltime",
      "kpmg-intern",
      "cu-boulder",
      "tech-i-use",
      "frontend",
      "backend",
      "infra",
      "observability",
      "tooling",
      "productivity",
      "interesting-stuff",
    ]);
  });

  it("expands only the root and job-title folders by default", () => {
    expect(DEFAULT_EXPANDED_ITEMS).toEqual([
      "evan-mavis",
      "full-stack-web-developer",
    ]);
  });

  it("uses globally unique folder values", () => {
    expect(new Set(ALL_FOLDER_VALUES).size).toBe(ALL_FOLDER_VALUES.length);
  });

  it("uses unique values among siblings so react keys never collide", () => {
    for (const siblingValues of collectChildValueGroups(PORTFOLIO_TREE_DATA)) {
      expect(new Set(siblingValues).size).toBe(siblingValues.length);
    }
  });

  it("has no projects folder or wishswipe leaf anywhere", () => {
    const values = collectChildValueGroups(PORTFOLIO_TREE_DATA).flat();
    expect(values).not.toContain("projects");
    expect(values).not.toContain("wishswipe");
    expect(findFolder(PORTFOLIO_TREE_DATA, "projects")).toEqual([]);
  });

  it.each([
    [
      "frontend",
      ["next.js", "vite", "react", "typescript", "shadcn", "tailwind"],
    ],
    [
      "backend",
      [
        "express",
        "drizzle",
        "postgres",
        "neon",
        "better-auth",
        "inngest",
        "resend",
        "stripe",
        "algolia",
        "sanity",
      ],
    ],
    ["infra", ["vercel", "render", "aws"]],
    ["observability", ["posthog", "sentry"]],
    [
      "tooling",
      ["cursor", "codex", "github", "factory", "my-agentic-workflow-skills"],
    ],
    ["productivity", ["linear", "notion", "slack", "excalidraw"]],
  ])("tech i use/%s contains exactly the expected items", (folder, items) => {
    const techIUse = findFolder(PORTFOLIO_TREE_DATA, "tech-i-use");
    const children = findFolder(techIUse, folder);
    expect(children.map((child) => child.value)).toEqual(items);
  });

  it("gives every tech leaf a bundled brand icon (no fallback icons)", () => {
    const techIUse = findFolder(PORTFOLIO_TREE_DATA, "tech-i-use");
    const files: TreeFileNode[] = [];
    const collect = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (node.kind === "file") files.push(node);
        else collect(node.children);
      }
    };
    collect(techIUse);
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      expect(file.techIcon, `techIcon for ${file.value}`).toBeDefined();
      expect(
        GENERATED_ICONS[file.techIcon as string],
        `bundled icon for ${file.value}`,
      ).toBeDefined();
    }
  });

  it("links meet your goals to chain-log in a new tab with tracking", () => {
    const leaf = findFile(PORTFOLIO_TREE_DATA, "meet-your-goals");
    expect(leaf).toBeDefined();
    expect(leaf?.label).toBe("meet your goals");
    expect(leaf?.link).toEqual({
      type: "external",
      href: "https://chain-log.app",
      newTab: true,
    });
    expect(leaf?.trackEvent).toBe("meet_your_goals_click");
    expect(findFolder(PORTFOLIO_TREE_DATA, "interesting-stuff")).toContain(
      leaf,
    );
  });

  it("links my agentic workflow skills to the skills repo in a new tab", () => {
    const leaf = findFile(PORTFOLIO_TREE_DATA, "my-agentic-workflow-skills");
    expect(leaf).toBeDefined();
    expect(leaf?.label).toBe("my agentic workflow skills");
    expect(leaf?.link).toEqual({
      type: "external",
      href: "https://github.com/evan-mavis/skills",
      newTab: true,
    });
    expect(leaf?.trackEvent).toBe("skills_repo_click");
    expect(findFolder(PORTFOLIO_TREE_DATA, "tooling")).toContain(leaf);
  });

  it("gives the beli leaf a unique value and keeps its external url", () => {
    const beli = findFile(PORTFOLIO_TREE_DATA, "beli");
    expect(beli).toBeDefined();
    expect(beli?.label).toBe("beli");
    expect(beli?.link).toEqual({
      type: "external",
      href: "https://beliapp.co/app/evanmavis",
      newTab: true,
    });
    const food = findFile(PORTFOLIO_TREE_DATA, "food");
    expect(food?.link).toEqual({ type: "internal", href: "/food" });
  });
});
