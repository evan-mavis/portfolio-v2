"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";

interface TravelImage {
  src: string;
  alt: string;
  caption: string;
}

const travelImages: TravelImage[] = [
  {
    src: "/vietnam-ninh-binh-ngoa-long.jpg",
    alt: "Núi Ngoa Long - Ninh Binh, Vietnam",
    caption: "Núi Ngoa Long - Ninh Binh, Vietnam",
  },
  {
    src: "/greece-naxos-mt-zas.jpeg",
    alt: "Mount Zas - Naxos, Greece",
    caption: "Mount Zas - Naxos, Greece",
  },
  {
    src: "/bali-uluwatu-bingin-beach.jpg",
    alt: "Bingin Beach - Uluwatu, Bali",
    caption: "Bingin Beach - Uluwatu, Bali",
  },
  {
    src: "/greece-milos-best-beach.jpeg",
    alt: "Best Beach - Milos, Greece",
    caption: "Best Beach - Milos, Greece",
  },
  {
    src: "/italy-positano-beach.jpg",
    alt: "Positano, Italy",
    caption: "Positano, Italy",
  },
  {
    src: "/greece-milos-fishing-village.jpeg",
    alt: "Fishing Village - Milos, Greece",
    caption: "Fishing Village - Milos, Greece",
  },
  {
    src: "/us-california-slo.jpeg",
    alt: "San Luis Obispo - California, US",
    caption: "San Luis Obispo - California, US",
  },
  {
    src: "/greece-milos-fishing-boats.jpeg",
    alt: "Fishing Boats - Milos, Greece",
    caption: "Fishing Boats - Milos, Greece",
  },
  {
    src: "/bali-ubud-rice-terraces.jpg",
    alt: "Rice Terraces - Ubud, Bali",
    caption: "Rice Terraces - Ubud, Bali",
  },
  {
    src: "/us-boulder-chautauqua-park.jpg",
    alt: "Chautauqua Park - Boulder, US",
    caption: "Chautauqua Park - Boulder, US",
  },
  {
    src: "/greece-milos-hotel-view.jpeg",
    alt: "Hotel View - Milos, Greece",
    caption: "Hotel View - Milos, Greece",
  },
  {
    src: "/bali-kintamani-ulun-danu-batur.jpg",
    alt: "Ulun Danu Batur - Kintamani, Bali",
    caption: "Ulun Danu Batur - Kintamani, Bali",
  },
  {
    src: "/us-boulder-flatirons.jpg",
    alt: "Flatirons - Boulder, US",
    caption: "Flatirons - Boulder, US",
  },
  {
    src: "/greece-milos-medusa.jpeg",
    alt: "Medusa - Milos, Greece",
    caption: "Medusa - Milos, Greece",
  },
  {
    src: "/japan-kyoto-fushimi-inari.jpg",
    alt: "Fushimi Inari - Kyoto, Japan",
    caption: "Fushimi Inari - Kyoto, Japan",
  },
  {
    src: "/us-new-york-big-apple.jpg",
    alt: "The Big Apple - New York, US",
    caption: "The Big 🍎",
  },
  {
    src: "/us-new-york-central-park-garden.jpeg",
    alt: "Central Park Garden - New York, US",
    caption: "Central Park Garden - New York, US",
  },
  {
    src: "/japan-kyoto-gion-district.jpg",
    alt: "Gion District - Kyoto, Japan",
    caption: "Gion District - Kyoto, Japan",
  },
  {
    src: "/greece-paros-castle.jpeg",
    alt: "Castle - Paros, Greece",
    caption: "Castle - Paros, Greece",
  },
  {
    src: "/us-wyoming-jackson-hole.jpeg",
    alt: "Jackson Hole - Wyoming, US",
    caption: "Jackson Hole - Wyoming, US",
  },
  {
    src: "/us-idaho-sun-valley-ice-hockey.jpeg",
    alt: "Ice Hockey - Sun Valley, Idaho, US",
    caption: "Ice Hockey - Sun Valley, Idaho, US",
  },
  {
    src: "/japan-kyoto-kinkaku-ji.jpg",
    alt: "Kinkaku-ji - Kyoto, Japan",
    caption: "Kinkaku-ji - Kyoto, Japan",
  },
  {
    src: "/costa-rica-papagayo-peninsula.jpg",
    alt: "Papagayo Peninsula - Costa Rica",
    caption: "Papagayo Peninsula - Costa Rica",
  },
  {
    src: "/japan-osaka-dotonbori.jpg",
    alt: "Dotonbori - Osaka, Japan",
    caption: "Dotonbori - Osaka, Japan",
  },
  {
    src: "/greece-paros-party.jpeg",
    alt: "Paros, Greece",
    caption: "Paros, Greece",
  },
  {
    src: "/vietnam-ha-long-bay.jpg",
    alt: "Ha Long Bay, Vietnam",
    caption: "Ha Long Bay, Vietnam",
  },
  {
    src: "/germany-berlin-cathedral.jpeg",
    alt: "Berlin Cathedral - Berlin, Germany",
    caption: "Berlin Cathedral - Berlin, Germany",
  },
  {
    src: "/japan-kyoto-bamboo-forest.jpg",
    alt: "Bamboo Forest - Kyoto, Japan",
    caption: "Bamboo Forest - Kyoto, Japan",
  },
  {
    src: "/vietnam-hanoi-train-street.jpg",
    alt: "Hanoi Train Street - Hanoi, Vietnam",
    caption: "Hanoi Train Street - Hanoi, Vietnam",
  },
  {
    src: "/us-new-york-friends-fidi.jpeg",
    alt: "Friends - FiDi, New York, US",
    caption: "Friends - FiDi, New York, US",
  },
  {
    src: "/japan-tokyo-skytree.jpg",
    alt: "Skytree - Tokyo, Japan",
    caption: "Skytree - Tokyo, Japan",
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

  return (
    <PageLayout
      className="px-9 overflow-hidden"
      title="You should visit... ✈️"
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
