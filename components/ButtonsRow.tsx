"use client";

import { Expand, Minimize } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { ThemeToggle } from "./ThemeToggle";
import { useTreeStateContext } from "./TreeStateProvider";

export default function ButtonsRow() {
  const { allExpanded: isExpanded, handleAllExpandedChange: onExpandedChange } =
    useTreeStateContext();
  return (
    <>
      <Toggle
        variant="outline"
        pressed={isExpanded}
        onPressedChange={onExpandedChange}
        aria-label="expand all folders"
        className="relative overflow-hidden touch-manipulation min-w-[44px] min-h-[44px] text-primary"
      >
        <Minimize
          key={`minimize-${isExpanded}`}
          className="toggle-icon"
          data-active={isExpanded}
        />

        <Expand
          key={`expand-${isExpanded}`}
          className="toggle-icon"
          data-active={!isExpanded}
        />
      </Toggle>
      <ThemeToggle />
    </>
  );
}
