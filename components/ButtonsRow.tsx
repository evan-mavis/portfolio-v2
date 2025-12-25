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
        className="touch-manipulation min-w-[44px] min-h-[44px]"
      >
        {isExpanded ? <Minimize /> : <Expand />}
      </Toggle>
      <ThemeToggle />
    </>
  );
}
