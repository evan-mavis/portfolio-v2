import { useCallback, useState } from "react";
import {
  ALL_FOLDER_VALUES,
  DEFAULT_EXPANDED_ITEMS,
} from "@/components/portfolio-tree-data";
import { readTreeState, writeTreeState } from "./tree-state";
import { useMountEffect } from "./use-mount-effect";

// Owns the portfolio tree's expansion state and persists it to localStorage.
// Initial state is always the default expansion so server and client renders
// match; the stored state is read once after mount to avoid hydration
// mismatch. Every change writes straight through to storage.
export function useTreeState() {
  const [expandedItems, setExpandedItems] = useState<string[]>(
    DEFAULT_EXPANDED_ITEMS,
  );
  const [allExpanded, setAllExpanded] = useState(false);

  useMountEffect(() => {
    const stored = readTreeState();
    if (!stored) {
      return;
    }
    setExpandedItems(stored.expanded);
    setAllExpanded(stored.allExpanded);
  });

  const handleExpandedItemsChange = useCallback((next: string[]) => {
    const nextAllExpanded = ALL_FOLDER_VALUES.every((value) =>
      next.includes(value),
    );
    setExpandedItems(next);
    setAllExpanded(nextAllExpanded);
    writeTreeState({ expanded: next, allExpanded: nextAllExpanded });
  }, []);

  const handleAllExpandedChange = useCallback((pressed: boolean) => {
    const next = pressed ? [...ALL_FOLDER_VALUES] : [];
    setExpandedItems(next);
    setAllExpanded(pressed);
    writeTreeState({ expanded: next, allExpanded: pressed });
  }, []);

  return {
    expandedItems,
    allExpanded,
    handleExpandedItemsChange,
    handleAllExpandedChange,
  };
}
