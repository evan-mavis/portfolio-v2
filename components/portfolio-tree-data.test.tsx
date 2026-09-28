import { describe, expect, it } from "vitest";
import {
  ALL_FOLDER_VALUES,
  DEFAULT_EXPANDED_ITEMS,
  PORTFOLIO_TREE_DATA,
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

describe("portfolio tree data", () => {
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
      "my-tech-stack",
      "tooling",
      "productivity",
      "interesting-stuff",
      "projects",
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
});
