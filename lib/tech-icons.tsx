import React from "react";
import { FileIcon } from "lucide-react";
import { GENERATED_ICONS } from "./icons-generated";

const iconClass = "w-[1em] h-[1em]";

// use local brand art; unknown names get a file icon.
export function getTechIcon(techName: string): React.ReactNode {
  const name = techName.toLowerCase().trim();
  const icon = GENERATED_ICONS[name];

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
