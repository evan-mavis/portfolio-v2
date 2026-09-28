import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GENERATED_ICONS } from "./icons-generated";
import { getTechIcon } from "./tech-icons";

function renderIcon(name: string): SVGSVGElement {
  const { container } = render(<>{getTechIcon(name)}</>);
  const svg = container.querySelector("svg");
  expect(svg).not.toBeNull();
  return svg as unknown as SVGSVGElement;
}

describe("getTechIcon", () => {
  it("renders an inline svg with path content for a known technology", () => {
    const svg = renderIcon("react");
    expect(svg.querySelector("path")).not.toBeNull();
    expect(svg.getAttribute("viewBox")).toBe("0 0 24 24");
    expect(svg.getAttribute("fill")).toBe("currentColor");
  });

  it("normalizes case and surrounding whitespace", () => {
    const svg = renderIcon("  NextJS ");
    expect(svg.querySelector("path")).not.toBeNull();
    expect(svg.getAttribute("class")).not.toContain("lucide");
  });

  it("falls back to the lucide file icon for unknown names", () => {
    const svg = renderIcon("cobol");
    expect(svg.getAttribute("class")).toContain("lucide");
  });

  it("no longer maps the removed azure entry", () => {
    const svg = renderIcon("azure");
    expect(svg.getAttribute("class")).toContain("lucide");
  });

  it.each([
    "postgres",
    "nextjs",
    "vite",
    "typescript",
    "shadcn",
    "tailwind",
    "drizzle",
    "neon",
    "vercel",
    "express",
    "betterauth",
    "github",
    "git",
    "cursor",
    "codex",
    "obsidian",
    "excalidraw",
    "linear",
    "notion",
    "slack",
    "python",
    "react",
    "linkedin",
    "email",
    "travel",
    "food",
    "wishswipe",
    "chainlog",
    "posthog",
    "render",
    "resend",
    "stripe",
    "algolia",
    "inngest",
    "aws",
    "sanity",
    "sentry",
    "factory",
  ])("resolves a bundled brand icon for %s", (name) => {
    const svg = renderIcon(name);
    expect(svg.getAttribute("class")).not.toContain("lucide");
    expect(svg.querySelector("path, g, circle, rect")).not.toBeNull();
  });

  it("bundles a distinct body for every generated icon", () => {
    const bodies = Object.values(GENERATED_ICONS).map((icon) => icon.body);
    expect(new Set(bodies).size).toBe(bodies.length);
  });

  it("emits positive dimensions for every generated icon", () => {
    for (const icon of Object.values(GENERATED_ICONS)) {
      expect(icon.width).toBeGreaterThan(0);
      expect(icon.height).toBeGreaterThan(0);
    }
  });
});
