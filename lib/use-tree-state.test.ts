import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  ALL_FOLDER_VALUES,
  DEFAULT_EXPANDED_ITEMS,
} from "@/components/portfolio-tree-data";
import { readTreeState, TREE_STORAGE_KEY } from "./tree-state";
import { useTreeState } from "./use-tree-state";

describe("useTreeState", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts with the default expansion when storage is empty", () => {
    const { result } = renderHook(() => useTreeState());
    expect(result.current.expandedItems).toEqual(DEFAULT_EXPANDED_ITEMS);
    expect(result.current.allExpanded).toBe(false);
    expect(readTreeState()).toBeNull();
  });

  it("restores stored expansion state on mount", () => {
    window.localStorage.setItem(
      TREE_STORAGE_KEY,
      JSON.stringify({
        expanded: ["evan-mavis", "career"],
        allExpanded: false,
      }),
    );
    const { result } = renderHook(() => useTreeState());
    expect(result.current.expandedItems).toEqual(["evan-mavis", "career"]);
    expect(result.current.allExpanded).toBe(false);
  });

  it("restores the all-expanded flag on mount", () => {
    window.localStorage.setItem(
      TREE_STORAGE_KEY,
      JSON.stringify({ expanded: ALL_FOLDER_VALUES, allExpanded: true }),
    );
    const { result } = renderHook(() => useTreeState());
    expect(result.current.allExpanded).toBe(true);
  });

  it("falls back to defaults when stored state is corrupt", () => {
    window.localStorage.setItem(TREE_STORAGE_KEY, "{not json");
    const { result } = renderHook(() => useTreeState());
    expect(result.current.expandedItems).toEqual(DEFAULT_EXPANDED_ITEMS);
  });

  it("writes through on every folder expansion change", () => {
    const { result } = renderHook(() => useTreeState());
    act(() => {
      result.current.handleExpandedItemsChange([
        "evan-mavis",
        "interesting-stuff",
      ]);
    });
    expect(readTreeState()).toEqual({
      expanded: ["evan-mavis", "interesting-stuff"],
      allExpanded: false,
    });
  });

  it("marks allExpanded when every folder is expanded manually", () => {
    const { result } = renderHook(() => useTreeState());
    act(() => {
      result.current.handleExpandedItemsChange([...ALL_FOLDER_VALUES]);
    });
    expect(result.current.allExpanded).toBe(true);
    expect(readTreeState()).toEqual({
      expanded: [...ALL_FOLDER_VALUES],
      allExpanded: true,
    });
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
    expect(readTreeState()).toEqual({
      expanded: collapsedOne,
      allExpanded: false,
    });
  });

  it("expand-all writes every folder with allExpanded true", () => {
    const { result } = renderHook(() => useTreeState());
    act(() => {
      result.current.handleAllExpandedChange(true);
    });
    expect(result.current.expandedItems).toEqual(ALL_FOLDER_VALUES);
    expect(readTreeState()).toEqual({
      expanded: ALL_FOLDER_VALUES,
      allExpanded: true,
    });
  });

  it("collapse-all writes an empty expansion with allExpanded false", () => {
    const { result } = renderHook(() => useTreeState());
    act(() => {
      result.current.handleAllExpandedChange(true);
    });
    act(() => {
      result.current.handleAllExpandedChange(false);
    });
    expect(result.current.expandedItems).toEqual([]);
    expect(readTreeState()).toEqual({ expanded: [], allExpanded: false });
  });
});
