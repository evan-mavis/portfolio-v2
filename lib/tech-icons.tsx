import React from "react";
import { FileIcon } from "lucide-react";
import { GENERATED_ICONS } from "./icons-generated";

const iconClass = "w-[1em] h-[1em]";

// use local brand art; unknown names get a file icon.
export function getTechIcon(techName: string): React.ReactNode {
  const name = techName.toLowerCase().trim();
  if (name === "factory") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/factory-logo.svg"
        alt=""
        aria-hidden="true"
        className="h-[1.4em] w-[1.4em] rounded-[0.15em]"
      />
    );
  }

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
