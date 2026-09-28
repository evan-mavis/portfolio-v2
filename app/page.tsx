"use client";

import ButtonsRow from "@/components/ButtonsRow";
import PortfolioTree from "@/components/PortfolioTree";
import { useTreeState } from "@/lib/use-tree-state";

export default function Home() {
  const {
    expandedItems,
    allExpanded,
    handleExpandedItemsChange,
    handleAllExpandedChange,
  } = useTreeState();

  return (
    <main className="p-4 relative min-h-screen">
      <div className="absolute top-4 right-4 flex gap-2 items-center z-50">
        <ButtonsRow
          isExpanded={allExpanded}
          onExpandedChange={handleAllExpandedChange}
        />
      </div>
      <div className="flex w-full justify-center items-start ">
        <div className="w-fit">
          <PortfolioTree
            expandedItems={expandedItems}
            onExpandedChange={handleExpandedItemsChange}
          />
        </div>
      </div>
    </main>
  );
}
