export const TREE_STORAGE_KEY = "portfolio-tree-state";

export interface TreeState {
  expanded: string[];
  allExpanded: boolean;
}

function isTreeState(value: unknown): value is TreeState {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return (
    "expanded" in value &&
    Array.isArray(value.expanded) &&
    value.expanded.every((item: unknown) => typeof item === "string") &&
    "allExpanded" in value &&
    typeof value.allExpanded === "boolean"
  );
}

// Reads the persisted tree state. Returns null on the server, when nothing is
// stored, or when the stored value is corrupt.
export function readTreeState(): TreeState | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(TREE_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    return isTreeState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeTreeState(state: TreeState): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(TREE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable or full; persistence is best-effort
  }
}
