import ButtonsRow from "@/components/ButtonsRow";
import PortfolioTree from "@/components/PortfolioTree";
import { TreeStateProvider } from "@/components/TreeStateProvider";

export default function Home() {
  return (
    <main className="p-4 relative min-h-screen">
      <TreeStateProvider>
        <div className="absolute top-4 right-4 flex gap-2 items-center z-50">
          <ButtonsRow />
        </div>
        <div className="flex w-full justify-center items-start ">
          <div className="w-fit">
            <PortfolioTree />
          </div>
        </div>
      </TreeStateProvider>
    </main>
  );
}
