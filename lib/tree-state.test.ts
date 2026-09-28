import { beforeEach, describe, expect, it } from "vitest";
import { readTreeState, TREE_STORAGE_KEY, writeTreeState } from "./tree-state";

describe("tree-state storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("uses the portfolio-tree-state key", () => {
    expect(TREE_STORAGE_KEY).toBe("portfolio-tree-state");
  });

  it("returns null when nothing is stored", () => {
    expect(readTreeState()).toBeNull();
  });

  it("round-trips written state", () => {
    writeTreeState({ expanded: ["evan-mavis", "career"], allExpanded: false });
    expect(readTreeState()).toEqual({
      expanded: ["evan-mavis", "career"],
      allExpanded: false,
    });
  });

  it("round-trips the all-expanded state", () => {
    writeTreeState({ expanded: ["evan-mavis"], allExpanded: true });
    expect(readTreeState()).toEqual({
      expanded: ["evan-mavis"],
      allExpanded: true,
    });
  });

  it("returns null for corrupt JSON", () => {
    window.localStorage.setItem(TREE_STORAGE_KEY, "{not json");
    expect(readTreeState()).toBeNull();
  });

  it("returns null for structurally invalid state", () => {
    window.localStorage.setItem(
      TREE_STORAGE_KEY,
      JSON.stringify({ expanded: "nope", allExpanded: "yes" }),
    );
    expect(readTreeState()).toBeNull();
  });

  it("returns null when expanded contains non-strings", () => {
    window.localStorage.setItem(
      TREE_STORAGE_KEY,
      JSON.stringify({ expanded: ["evan-mavis", 42], allExpanded: false }),
    );
    expect(readTreeState()).toBeNull();
  });
});
