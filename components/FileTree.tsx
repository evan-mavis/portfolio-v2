"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TreeContextValue {
  expandedItems: string[];
  onExpandedChange: (items: string[]) => void;
  selectedId: string | null;
  selectItem: (id: string) => void;
}

const TreeContext = createContext<TreeContextValue | null>(null);

function useTree() {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("Tree components must be used within a Tree");
  }
  return context;
}

interface TreeProps {
  expandedItems: string[];
  onExpandedChange: (items: string[]) => void;
  className?: string;
  children: ReactNode;
}

export function Tree({
  expandedItems,
  onExpandedChange,
  className,
  children,
}: TreeProps) {
  const [selectedId, selectItem] = useState<string | null>(null);

  return (
    <TreeContext.Provider
      value={{ expandedItems, onExpandedChange, selectedId, selectItem }}
    >
      <Accordion.Root
        type="multiple"
        value={expandedItems}
        className={cn("flex flex-col gap-1 px-2", className)}
      >
        {children}
      </Accordion.Root>
    </TreeContext.Provider>
  );
}

interface FolderProps {
  value: string;
  element: ReactNode;
  accessory?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Folder({
  value,
  element,
  accessory,
  className,
  children,
}: FolderProps) {
  const { expandedItems, onExpandedChange } = useTree();
  const isExpanded = expandedItems.includes(value);
  const Icon = isExpanded ? FolderOpenIcon : FolderIcon;

  return (
    <Accordion.Item value={value} className="relative">
      <div className="flex items-center">
        <Accordion.Trigger
          className={cn(
            "flex cursor-pointer items-center gap-1 rounded-md text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            className,
          )}
          onClick={() =>
            onExpandedChange(
              isExpanded
                ? expandedItems.filter((item) => item !== value)
                : [...expandedItems, value],
            )
          }
        >
          <Icon className="h-[1em] w-[1em] shrink-0" aria-hidden="true" />
          <span className="flex-1 text-left">{element}</span>
        </Accordion.Trigger>
        {accessory}
      </div>
      <Accordion.Content className="relative overflow-hidden text-base">
        <div
          aria-hidden="true"
          className="absolute left-1.5 h-full w-px rounded-md bg-muted"
        />
        <Accordion.Root
          type="multiple"
          value={expandedItems}
          className="ml-5 flex flex-col gap-1 py-1"
        >
          {children}
        </Accordion.Root>
      </Accordion.Content>
    </Accordion.Item>
  );
}

interface FileProps {
  value: string;
  fileIcon?: ReactNode;
  isLink: boolean;
  className?: string;
  children: ReactNode;
}

export function File({
  value,
  fileIcon,
  isLink,
  className,
  children,
}: FileProps) {
  const { selectedId, selectItem } = useTree();
  const classNames = cn(
    "flex w-fit items-center justify-start gap-1 rounded-md pr-1 text-left text-base",
    selectedId === value && "bg-muted",
    className,
  );
  const content = (
    <>
      {fileIcon ?? (
        <FileIcon
          className="h-[1.25em] w-[1.25em] shrink-0"
          aria-hidden="true"
        />
      )}
      <span className="text-left">{children}</span>
    </>
  );

  // Links own their interaction rather than nesting an anchor inside a button.
  if (isLink) {
    return <div className={classNames}>{content}</div>;
  }

  return (
    <button
      type="button"
      className={cn(
        classNames,
        "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      )}
      onClick={() => selectItem(value)}
    >
      {content}
    </button>
  );
}
