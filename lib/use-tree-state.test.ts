import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ALL_FOLDER_VALUES,
  DEFAULT_EXPANDED_ITEMS,
} from "@/components/portfolio-tree-data";
import { useTreeState } from "./use-tree-state";

describe("useTreeState", () => {
  it("starts with the root and job title open", () => {
    const { result } = renderHook(() => useTreeState());
    expect(result.current.expandedItems).toEqual(DEFAULT_EXPANDED_ITEMS);
    expect(result.current.allExpanded).toBe(false);
  });

  it("ignores a collapsed state left in browser storage", () => {
    window.localStorage.setItem(
      "portfolio-tree-state",
      JSON.stringify({ expanded: [], allExpanded: false }),
    );
    const { result } = renderHook(() => useTreeState());
    expect(result.current.expandedItems).toEqual(DEFAULT_EXPANDED_ITEMS);
    expect(result.current.allExpanded).toBe(false);
  });

  it("keeps folder changes in memory", () => {
    const { result } = renderHook(() => useTreeState());
    act(() => {
      result.current.handleExpandedItemsChange([
        "evan-mavis",
        "interesting-stuff",
      ]);
    });
    expect(result.current.expandedItems).toEqual([
      "evan-mavis",
      "interesting-stuff",
    ]);
  });

  it("marks allExpanded when every folder is expanded manually", () => {
    const { result } = renderHook(() => useTreeState());
    act(() => {
      result.current.handleExpandedItemsChange([...ALL_FOLDER_VALUES]);
    });
    expect(result.current.allExpanded).toBe(true);
  });

  it("clears allExpanded when a folder is collapsed after expand-all", () => {
    const { result } = renderHook(() => useTreeState());
    act(() => {
      result.current.handleAllExpandedChange(true);
    });
    const collapsedOne = ALL_FOLDER_VALUES.filter(
      (value) => value !== "career",
    );
    act(() => {
      result.current.handleExpandedItemsChange(collapsedOne);
    });
    expect(result.current.allExpanded).toBe(false);
  });

  it("expand-all opens every folder", () => {
    const { result } = renderHook(() => useTreeState());
    act(() => {
      result.current.handleAllExpandedChange(true);
    });
    expect(result.current.expandedItems).toEqual(ALL_FOLDER_VALUES);
  });

  it("collapse-all closes every folder", () => {
    const { result } = renderHook(() => useTreeState());
    act(() => {
      result.current.handleAllExpandedChange(true);
    });
    act(() => {
      result.current.handleAllExpandedChange(false);
    });
    expect(result.current.expandedItems).toEqual([]);
  });
});
