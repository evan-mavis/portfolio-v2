import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import TrackPageView from "@/components/TrackPageView";
import { TRAVEL_IMAGES } from "./travel-data";

const ALIGNMENT_CLASSES = ["", "md:items-end", "", "md:items-start"];

export default function TravelPage() {
  return (
    <PageLayout
      className="px-9 overflow-hidden"
      title="you should visit... ✈️"
      titleClassName="mb-16"
    >
      <TrackPageView event="travel_page_view" />
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-10 py-5">
        {TRAVEL_IMAGES.map((image, index) => {
          const topLeft = index % 2 === 0;

          return (
            <div
              key={image.src}
              className={`relative z-10 flex w-full flex-col items-center ${ALIGNMENT_CLASSES[index % 4]}`}
            >
              <figure className="relative group flex w-full max-w-[500px] flex-col items-center justify-center transition-transform duration-300 hover:scale-105 md:w-[700px]">
                <div className="relative w-full">
                  <div className="absolute inset-0 -z-10 rounded-xl bg-primary/10 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 572px) 500px, calc(100vw - 72px)"
                    priority={index < 2}
                    className="relative h-auto w-full rounded-xl border-4 border-primary/30 bg-background shadow-2xl transition-all group-hover:border-primary/60 group-hover:shadow-primary/20"
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute z-20 text-4xl drop-shadow-lg ${topLeft ? "top-3 left-3" : "top-3 right-3"}`}
                    style={{ transform: `rotate(${topLeft ? -15 : 15}deg)` }}
                  >
                    📍
                  </span>
                </div>
                <figcaption className="mt-4 rounded-xl border-2 border-primary/30 bg-primary/15 px-5 py-3 text-center text-base font-semibold text-primary shadow-md backdrop-blur-sm transition-all group-hover:border-primary/40 group-hover:bg-primary/20">
                  {image.caption}
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}
