import React from "react";
import { FileIcon } from "lucide-react";
import { GENERATED_ICONS } from "./icons-generated";

const iconClass = "w-[1em] h-[1em]";

// Renders a bundled inline SVG for known tech names (see scripts/generate-icons.mjs),
// falling back to the lucide file icon for anything unmapped.
export function getTechIcon(techName: string): React.ReactNode {
  const icon = GENERATED_ICONS[techName.toLowerCase().trim()];

  if (!icon) {
    return <FileIcon className={iconClass} />;
  }

  return (
    <svg
      className={iconClass}
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      fill="currentColor"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
