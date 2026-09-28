"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useTreeState } from "@/lib/use-tree-state";

type TreeState = ReturnType<typeof useTreeState>;

const TreeStateContext = createContext<TreeState | null>(null);

// keep tree state across page visits.
export function TreeStateProvider({ children }: { children: ReactNode }) {
  const treeState = useTreeState();
  return (
    <TreeStateContext.Provider value={treeState}>
      {children}
    </TreeStateContext.Provider>
  );
}

export function useTreeStateContext(): TreeState {
  const treeState = useContext(TreeStateContext);
  if (!treeState) {
    throw new Error(
      "useTreeStateContext must be used within a TreeStateProvider",
    );
  }
  return treeState;
}
