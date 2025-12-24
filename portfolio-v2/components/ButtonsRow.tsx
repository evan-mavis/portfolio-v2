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
      >
        {isExpanded ? <Minimize /> : <Expand />}
      </Toggle>
      <ThemeToggle />
    </>
  );
}
