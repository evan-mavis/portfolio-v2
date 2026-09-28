import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins truthy class names and drops falsy ones", () => {
    expect(cn("a", false, undefined, "b", null, "")).toBe("a b");
  });

  it("resolves conflicting Tailwind utilities with the last one winning", () => {
    expect(cn("p-2 text-sm", "p-4")).toBe("text-sm p-4");
  });

  it("supports conditional object syntax", () => {
    expect(cn({ hidden: false, block: true }, "mt-1")).toBe("block mt-1");
  });
});
