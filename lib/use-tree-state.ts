import { useCallback, useState } from "react";
import {
  ALL_FOLDER_VALUES,
  DEFAULT_EXPANDED_ITEMS,
} from "@/components/portfolio-tree-data";

// each page load starts with the default tree; the provider keeps state across routes.
export function useTreeState() {
  const [expandedItems, setExpandedItems] = useState<string[]>(
    DEFAULT_EXPANDED_ITEMS,
  );
  const [allExpanded, setAllExpanded] = useState(false);

  const handleExpandedItemsChange = useCallback((next: string[]) => {
    const nextAllExpanded = ALL_FOLDER_VALUES.every((value) =>
      next.includes(value),
    );
    setExpandedItems(next);
    setAllExpanded(nextAllExpanded);
  }, []);

  const handleAllExpandedChange = useCallback((pressed: boolean) => {
    const next = pressed ? [...ALL_FOLDER_VALUES] : [];
    setExpandedItems(next);
    setAllExpanded(pressed);
  }, []);

  return {
    expandedItems,
    allExpanded,
    handleExpandedItemsChange,
    handleAllExpandedChange,
  };
}
