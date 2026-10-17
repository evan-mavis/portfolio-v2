import PageLayout from "@/components/PageLayout";
import TrackPageView from "@/components/TrackPageView";
import FoodGallery from "./FoodGallery";

export default function FoodPage() {
  return (
    <PageLayout
      className="p-4"
      title={
        <>
          <h1 className="text-3xl font-bold mb-4">
            my food trip to bali, vietnam, and japan... ranked!
          </h1>
          <h2 className="text-lg mb-2">
            <em className="text-primary">double click</em> each picture for more
            details.
          </h2>
          <h2 className="text-base opacity-80">
            disclaimer: everything was amazing except for f tier.
          </h2>
        </>
      }
    >
      <TrackPageView event="food_page_view" />
      <FoodGallery />
    </PageLayout>
  );
}
