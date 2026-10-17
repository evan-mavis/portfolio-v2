import { useCallback, useState } from "react";
import { ALL_FOLDER_VALUES, DEFAULT_EXPANDED_ITEMS } from "./portfolio-data";
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
  const allExpanded = ALL_FOLDER_VALUES.every((value) =>
    expandedItems.includes(value),
  );

  useMountEffect(() => {
    const stored = readTreeState();
    if (!stored) {
      return;
    }
    setExpandedItems(stored.expanded);
  });

  const handleExpandedItemsChange = useCallback((next: string[]) => {
    const nextAllExpanded = ALL_FOLDER_VALUES.every((value) =>
      next.includes(value),
    );
    setExpandedItems(next);
    writeTreeState({ expanded: next, allExpanded: nextAllExpanded });
  }, []);

  const handleAllExpandedChange = useCallback(
    (pressed: boolean) => {
      handleExpandedItemsChange(pressed ? [...ALL_FOLDER_VALUES] : []);
    },
    [handleExpandedItemsChange],
  );

  return {
    expandedItems,
    allExpanded,
    handleExpandedItemsChange,
    handleAllExpandedChange,
  };
}
