"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import { track } from "@vercel/analytics";

interface TravelImage {
  src: string;
  alt: string;
  caption: string;
}

const travelImages: TravelImage[] = [
  {
    src: "/vietnam-ninh-binh-ngoa-long.jpg",
    alt: "núi ngoa long - ninh binh, vietnam",
    caption: "núi ngoa long - ninh binh, vietnam",
  },
  {
    src: "/greece-naxos-mt-zas.jpeg",
    alt: "mount zas - naxos, greece",
    caption: "mount zas - naxos, greece",
  },
  {
    src: "/japan-osaka-dotonbori.jpg",
    alt: "dotonbori - osaka, japan",
    caption: "dotonbori - osaka, japan",
  },
  {
    src: "/bali-uluwatu-bingin-beach.jpg",
    alt: "bingin beach - uluwatu, bali",
    caption: "bingin beach - uluwatu, bali",
  },
  {
    src: "/greece-milos-best-beach.jpeg",
    alt: "best beach - milos, greece",
    caption: "best beach - milos, greece",
  },
  {
    src: "/italy-positano-beach.jpg",
    alt: "positano, italy",
    caption: "positano, italy",
  },
  {
    src: "/greece-milos-fishing-village.jpeg",
    alt: "fishing village - milos, greece",
    caption: "fishing village - milos, greece",
  },
  {
    src: "/us-california-slo.jpeg",
    alt: "san luis obispo - california, us",
    caption: "san luis obispo - california, us",
  },
  {
    src: "/greece-milos-fishing-boats.jpeg",
    alt: "cool boats - milos, greece",
    caption: "cool boats - milos, greece",
  },
  {
    src: "/bali-ubud-rice-terraces.jpg",
    alt: "rice terraces - ubud, bali",
    caption: "rice terraces - ubud, bali",
  },
  {
    src: "/us-boulder-chautauqua-park.jpg",
    alt: "chautauqua park - boulder, us",
    caption: "chautauqua park - boulder, us",
  },
  {
    src: "/greece-milos-hotel-view.jpeg",
    alt: "wow - milos, greece",
    caption: "wow - milos, greece",
  },
  {
    src: "/bali-kintamani-ulun-danu-batur.jpg",
    alt: "ulun danu batur - kintamani, bali",
    caption: "ulun danu batur - kintamani, bali",
  },
  {
    src: "/us-boulder-flatirons.jpg",
    alt: "flatirons - boulder, us",
    caption: "flatirons - boulder, us",
  },
  {
    src: "/greece-milos-medusa.jpeg",
    alt: "medusa - milos, greece",
    caption: "medusa - milos, greece",
  },
  {
    src: "/japan-kyoto-fushimi-inari.jpg",
    alt: "fushimi inari - kyoto, japan",
    caption: "fushimi inari - kyoto, japan",
  },
  {
    src: "/us-new-york-big-apple.jpg",
    alt: "the big apple - new york, us",
    caption: "the big 🍎",
  },
  {
    src: "/us-new-york-central-park-garden.jpeg",
    alt: "central park garden - new york, us",
    caption: "central park garden - new york, us",
  },
  {
    src: "/japan-kyoto-gion-district.jpg",
    alt: "gion district - kyoto, japan",
    caption: "gion district - kyoto, japan",
  },
  {
    src: "/greece-paros-castle.jpeg",
    alt: "castle - paros, greece",
    caption: "castle - paros, greece",
  },
  {
    src: "/us-wyoming-jackson-hole.jpeg",
    alt: "jackson hole - wyoming, us",
    caption: "jackson hole - wyoming, us",
  },
  {
    src: "/us-idaho-sun-valley-ice-hockey.jpeg",
    alt: "ice hockey - sun valley, idaho, us",
    caption: "ice hockey - sun valley, idaho, us",
  },
  {
    src: "/japan-kyoto-kinkaku-ji.jpg",
    alt: "kinkaku-ji - kyoto, japan",
    caption: "kinkaku-ji - kyoto, japan",
  },
  {
    src: "/costa-rica-papagayo-peninsula.jpg",
    alt: "papagayo peninsula - costa rica",
    caption: "papagayo peninsula - costa rica",
  },
  {
    src: "/greece-paros-party.jpeg",
    alt: "paros, greece",
    caption: "paros, greece",
  },
  {
    src: "/vietnam-ha-long-bay.jpg",
    alt: "ha long bay, vietnam",
    caption: "ha long bay, vietnam",
  },
  {
    src: "/germany-berlin-cathedral.jpeg",
    alt: "berlin cathedral - berlin, germany",
    caption: "berlin cathedral - berlin, germany",
  },
  {
    src: "/japan-kyoto-bamboo-forest.jpg",
    alt: "bamboo forest - kyoto, japan",
    caption: "bamboo forest - kyoto, japan",
  },
  {
    src: "/vietnam-hanoi-train-street.jpg",
    alt: "hanoi train street - hanoi, vietnam",
    caption: "hanoi train street - hanoi, vietnam",
  },
  {
    src: "/us-new-york-friends-fidi.jpeg",
    alt: "friends - fidi, new york, us",
    caption: "friends - fidi, new york, us",
  },
  {
    src: "/japan-tokyo-skytree.jpg",
    alt: "skytree - tokyo, japan",
    caption: "skytree - tokyo, japan",
  },
];

interface PinPosition {
  corner: "top-left" | "top-right";
  rotation: number;
}

export default function TravelPage() {
  const [isMobile, setIsMobile] = useState(false);

  const pinPositions = useMemo<PinPosition[]>(() => {
    return travelImages.map((_, index) => {
      // Alternate between corners based on index for variety
      const corner = index % 2 === 0 ? "top-left" : "top-right";
      const rotation = corner === "top-left" ? -15 : 15;
      return { corner, rotation };
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    track("travel_page_view");
  }, []);

  return (
    <PageLayout
      className="px-9 overflow-hidden"
      title="you should visit... ✈️"
      titleClassName="mb-16"
    >
      <div className="w-full relative z-10">
        <div className="flex flex-col items-center justify-center relative py-5 w-full gap-10">
          {travelImages.map((image, index) => {
            const pin = pinPositions[index];
            const alignment = !isMobile
              ? index % 4 === 0
                ? "self-center"
                : index % 4 === 1
                  ? "self-end"
                  : index % 4 === 2
                    ? "self-center"
                    : "self-start"
              : "";

            return (
              <div
                key={index}
                className={`relative z-10 ${
                  alignment === "self-start"
                    ? "self-start"
                    : alignment === "self-end"
                      ? "self-end"
                      : "self-center"
                }`}
              >
                <figure className="flex flex-col items-center justify-center relative group transition-all duration-300 hover:scale-105">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={700}
                      height={467}
                      className="rounded-xl shadow-2xl border-4 border-primary/30 relative bg-background md:w-[700px] w-full max-w-[500px] group-hover:border-primary/60 group-hover:shadow-primary/20 transition-all"
                      quality={95}
                    />
                    <span
                      className={`absolute text-4xl z-20 pointer-events-none drop-shadow-lg filter ${
                        pin.corner === "top-left"
                          ? "top-3 left-3"
                          : "top-3 right-3"
                      }`}
                      style={{
                        transform: `rotate(${pin.rotation}deg)`,
                      }}
                    >
                      📍
                    </span>
                  </div>
                  <figcaption className="mt-4 px-5 py-3 rounded-xl bg-primary/15 border-2 border-primary/30 text-primary text-base font-semibold text-center backdrop-blur-sm group-hover:bg-primary/20 group-hover:border-primary/40 transition-all shadow-md">
                    {image.caption}
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
