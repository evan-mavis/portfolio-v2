"use client";

import { useState } from "react";
import ButtonsRow from "@/components/ButtonsRow";
import PortfolioTree from "@/components/PortfolioTree";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <main className="p-4 relative min-h-screen">
      <div className="absolute top-4 right-4 flex gap-2 items-center">
        <ButtonsRow isExpanded={isExpanded} onExpandedChange={setIsExpanded} />
      </div>
      <div className="flex w-full justify-center items-start pt-4">
        <div className="w-fit">
          <PortfolioTree isExpanded={isExpanded} />
        </div>
      </div>
    </main>
  );
}
