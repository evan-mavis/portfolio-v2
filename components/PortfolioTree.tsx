"use client";

import { useState } from "react";
import Link from "next/link";
import { Folder, Tree, File } from "./ui/file-tree";
import { getTechIcon } from "@/lib/tech-icons";
import {
  PORTFOLIO_TREE_DATA,
  type TreeFileNode,
  type TreeNode,
} from "./portfolio-tree-data";
import { useTreeStateContext } from "./TreeStateProvider";
import { CircleSmall } from "lucide-react";
import { track } from "@vercel/analytics";

const LINK_CLASS = "text-primary hover:underline";

function renderFileIcon(node: TreeFileNode) {
  if (node.techIcon) {
    return getTechIcon(node.techIcon);
  }
  if (node.bulletIcon) {
    return <CircleSmall className="w-[1.25em] h-[1.25em] shrink-0" />;
  }
  return undefined;
}

function renderFileLabel(node: TreeFileNode) {
  if (!node.link) {
    return node.label;
  }

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (node.trackEvent) {
      track(node.trackEvent);
    }
  };

  switch (node.link.type) {
    case "internal":
      return (
        <Link
          href={node.link.href}
          className={LINK_CLASS}
          onClick={handleClick}
        >
          {node.label}
        </Link>
      );
    case "download":
      return (
        <a
          href={node.link.href}
          download={node.link.href.split("/").pop()}
          className={LINK_CLASS}
          onClick={handleClick}
        >
          {node.label}
        </a>
      );
    case "external":
      return (
        <a
          href={node.link.href}
          {...(node.link.newTab
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={LINK_CLASS}
          onClick={handleClick}
        >
          {node.label}
        </a>
      );
    case "mailto":
      return (
        <a href={node.link.href} className={LINK_CLASS} onClick={handleClick}>
          {node.label}
        </a>
      );
  }
}

function renderNode(node: TreeNode): React.ReactNode {
  if (node.kind === "folder") {
    return (
      <Folder
        key={node.value}
        element={node.label}
        value={node.value}
        className={node.className}
      >
        {node.children.map(renderNode)}
      </Folder>
    );
  }
  return (
    <File
      key={node.value}
      value={node.value}
      fileIcon={renderFileIcon(node)}
      className={node.className}
    >
      {renderFileLabel(node)}
    </File>
  );
}

export default function PortfolioTree() {
  const { expandedItems, handleExpandedItemsChange: onExpandedChange } =
    useTreeStateContext();
  const [animate, setAnimate] = useState(false);

  return (
    <div className="inline-flex items-start gap-4">
      <Tree
        className="w-auto h-auto text-foreground dark:text-[#ffd48a] text-base lg:text-lg"
        expandedItems={expandedItems}
        animate={animate}
        onExpandedChange={(next) => {
          setAnimate(true);
          onExpandedChange(next);
        }}
      >
        {PORTFOLIO_TREE_DATA.map(renderNode)}
      </Tree>
    </div>
  );
}
