import React from "react";
import { Icon } from "@iconify/react";
import { FileIcon } from "lucide-react";

// Map technology names to their Iconify icons
export function getTechIcon(techName: string): React.ReactNode {
  const iconClass = "w-[1em] h-[1em]";

  const iconMap: Record<string, React.ReactNode> = {
    // Tech stack
    postgres: <Icon icon="simple-icons:postgresql" className={iconClass} />,
    azure: <Icon icon="simple-icons:azure" className={iconClass} />,
    nextjs: <Icon icon="devicon:nextjs" className={iconClass} />,
    typescript: <Icon icon="simple-icons:typescript" className={iconClass} />,
    shadcn: (
      <Icon icon="vscode-icons:file-type-light-shadcn" className={iconClass} />
    ),
    tailwind: <Icon icon="simple-icons:tailwindcss" className={iconClass} />,
    drizzle: <Icon icon="simple-icons:drizzle" className={iconClass} />,
    neon: (
      <Icon
        icon="logos:neon-icon"
        className={iconClass}
        style={{ filter: "brightness(0)" }}
      />
    ),
    vercel: <Icon icon="simple-icons:vercel" className={iconClass} />,
    express: <Icon icon="simple-icons:express" className={iconClass} />,
    betterauth: <Icon icon="simple-icons:betterauth" className={iconClass} />,
    github: <Icon icon="simple-icons:github" className={iconClass} />,

    // Other tech
    git: <Icon icon="simple-icons:git" className={iconClass} />,
    cursor: <Icon icon="simple-icons:cursor" className={iconClass} />,
    obsidian: <Icon icon="simple-icons:obsidian" className={iconClass} />,
    excalidraw: <Icon icon="simple-icons:excalidraw" className={iconClass} />,
    python: <Icon icon="simple-icons:python" className={iconClass} />,
    react: <Icon icon="simple-icons:react" className={iconClass} />,

    // Social/contact
    linkedin: <Icon icon="simple-icons:linkedin" className={iconClass} />,
    email: <Icon icon="ic:outline-email" className={iconClass} />,

    // Other
    travel: <Icon icon="game-icons:palm-tree" className={iconClass} />,
    food: <Icon icon="fluent:food-24-regular" className={iconClass} />,
    wishswipe: <Icon icon="weui:shop-outlined" className={iconClass} />,
    chainlog: <Icon icon="system-uicons:chain" className={iconClass} />,

    // Default fallback
    default: <FileIcon className={iconClass} />,
  };

  // Normalize the tech name (lowercase, handle variations)
  const normalized = techName.toLowerCase().trim();

  return iconMap[normalized] || iconMap.default;
}
