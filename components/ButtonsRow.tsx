"use client";

import { Expand, Minimize } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { ThemeToggle } from "./ThemeToggle";

interface ButtonsRowProps {
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export default function ButtonsRow({
  isExpanded,
  onExpandedChange,
}: ButtonsRowProps) {
  return (
    <>
      <Toggle
        variant="outline"
        pressed={isExpanded}
        onPressedChange={onExpandedChange}
        className="relative overflow-hidden touch-manipulation min-w-[44px] min-h-[44px]"
      >
        <Minimize
          key={`minimize-${isExpanded}`}
          className={`absolute transition-all ${
            isExpanded ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          style={{
            animation: isExpanded
              ? "theme-pop 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
              : undefined,
          }}
        />

        <Expand
          key={`expand-${isExpanded}`}
          className={`absolute transition-all ${
            !isExpanded ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          style={{
            animation: !isExpanded
              ? "theme-pop 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
              : undefined,
          }}
        />
      </Toggle>
      <ThemeToggle />
    </>
  );
}
