import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "./page";
import { TreeStateProvider } from "@/components/TreeStateProvider";

describe("home page server render", () => {
  it("is a server component with no use client directive", () => {
    const source = readFileSync(join(process.cwd(), "app", "page.tsx"), "utf8");
    expect(source).not.toMatch(/["']use client["']/);
  });

  it("renders the root and job title open", () => {
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
