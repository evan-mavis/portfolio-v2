import ButtonsRow from "@/components/ButtonsRow";
import PortfolioTree from "@/components/PortfolioTree";

export default function Home() {
  return (
    <main className="p-4 relative min-h-screen">
      <div className="absolute top-4 right-4 flex gap-2 items-center z-50">
        <ButtonsRow />
      </div>
      <div className="flex w-full justify-center items-start ">
        <div className="w-fit">
          <PortfolioTree />
        </div>
      </div>
    </main>
  );
}
