import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "./page";
import { TreeStateProvider } from "@/components/TreeStateProvider";
import { ALL_FOLDER_VALUES } from "@/components/portfolio-tree-data";
import { TREE_STORAGE_KEY } from "@/lib/tree-state";

describe("home page server render", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("is a server component with no use client directive", () => {
    const source = readFileSync(join(process.cwd(), "app", "page.tsx"), "utf8");
    expect(source).not.toMatch(/["']use client["']/);
  });

  it("renders the default expansion even when storage holds a different state", () => {
    window.localStorage.setItem(
      TREE_STORAGE_KEY,
      JSON.stringify({ expanded: ALL_FOLDER_VALUES, allExpanded: true }),
    );
    const html = renderToString(
      <TreeStateProvider>
        <Home />
      </TreeStateProvider>,
    );
    expect(html).toContain("career/");
    expect(html).not.toContain("airgoods");
    expect(html).not.toContain("excalidraw");
  });
});
