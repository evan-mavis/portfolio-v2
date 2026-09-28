import { isValidElement } from "react";
import { describe, expect, it } from "vitest";
import { getTechIcon } from "./tech-icons";

function iconName(node: React.ReactNode): unknown {
  return isValidElement<{ icon?: string }>(node) ? node.props.icon : undefined;
}

describe("getTechIcon", () => {
  it("returns the mapped Iconify icon for a known technology", () => {
    expect(iconName(getTechIcon("react"))).toBe("simple-icons:react");
  });

  it("normalizes case and surrounding whitespace", () => {
    expect(iconName(getTechIcon("  NextJS "))).toBe("file-icons:nextjs");
  });

  it("falls back to the generic file icon for unknown names", () => {
    const fallback = getTechIcon("cobol");
    expect(isValidElement(fallback)).toBe(true);
    expect(iconName(fallback)).toBeUndefined();
  });
});
