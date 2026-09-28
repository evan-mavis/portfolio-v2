import { useEffect } from "react";

// Escape hatch for one-time sync with an external system (browser APIs, DOM)
// on mount. Prefer derived state or event handlers for anything else.
export function useMountEffect(effect: () => void | (() => void)) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}
