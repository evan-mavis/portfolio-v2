"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import { track } from "@vercel/analytics";

interface FoodImage {
  src: string;
  alt: string;
  tier?: string;
}

const sTierImages: FoodImage[] = [
  { src: "/japan-osaka-scallop.jpeg", alt: "scallop - osaka, japan" },
  { src: "/japan-kyoto-ramen.jpeg", alt: "ramen - kyoto, japan" },
  { src: "/japan-tokyo-tuna-market.jpeg", alt: "tuna market - tokyo, japan" },
  { src: "/japan-tokyo-wagyu.jpeg", alt: "wagyu beef - tokyo, japan" },
  {
    src: "/japan-osaka-a5-kobe-wagyu-skewers.jpeg",
    alt: "a5 kobe wagyu skewers - osaka, japan",
  },
  {
    src: "/bali-ubud-dragon-fruit-bfast-bowl.jpeg",
    alt: "dragon fruit breakfast bowl - ubud, bali",
  },
  { src: "/japan-osaka-fatty-toro.jpeg", alt: "fatty toro - osaka, japan" },
  {
    src: "/vietnam-hoi-an-cao-lau-noodles.jpeg",
    alt: "cao lau noodles - hoi an, vietnam",
  },
  {
    src: "/bali-uluwatu-mie-goreng-and-pork-buns.jpeg",
    alt: "mie goreng and pork buns - uluwatu, bali",
  },
  { src: "/japan-tokyo-ramen.jpeg", alt: "ramen - tokyo, japan" },
  {
    src: "/vietnam-tam-coc-indian.jpeg",
    alt: "tikka masala - tam coc, vietnam",
  },
];

const aTierImages: FoodImage[] = [
  { src: "/japan-kyoto-wagyu-night.jpeg", alt: "wagyu night! - kyoto, japan" },
  {
    src: "/bali-ubud-breakfast-scramble.jpeg",
    alt: "chili egg scramble - ubud, bali",
  },
  { src: "/japan-osaka-nigiri.jpeg", alt: "nigiri - osaka, japan" },
  { src: "/bali-uluwatu-potstickers.jpeg", alt: "potstickers - uluwatu, bali" },
  {
    src: "/japan-tokyo-omakase-unagi.jpeg",
    alt: "omakase, unagi - tokyo, japan",
  },
  { src: "/japan-tokyo-nigiri.jpeg", alt: "nigiri - tokyo, japan" },
  { src: "/japan-osaka-dumplings.jpeg", alt: "dumplings - osaka, japan" },
  {
    src: "/vietnam-ho-chi-minh-pho-dau.jpeg",
    alt: "pho dau - ho chi minh city, vietnam",
  },
  {
    src: "/vietnam-hanoi-rich-dipping-noodles.jpeg",
    alt: "rich dipping noodles - hanoi, vietnam",
  },
  { src: "/bali-uluwatu-mie-goreng.jpeg", alt: "mie goreng - uluwatu, bali" },
  { src: "/japan-kyoto-ramen-2.jpeg", alt: "ramen - kyoto, japan" },
];

const bTierImages: FoodImage[] = [
  { src: "/bali-ubud-indian.jpeg", alt: "tikka masala - ubud, bali" },
  {
    src: "/japan-kyoto-cold-soba-and-tempura.jpeg",
    alt: "cold soba and tempura - kyoto, japan",
  },
  { src: "/japan-tokyo-ichiran.jpeg", alt: "ichiran ramen - tokyo, japan" },
  {
    src: "/japan-osaka-cold-breakfast-noodles.jpeg",
    alt: "cold breakfast noodles - osaka, japan",
  },
  {
    src: "/vietnam-ho-chi-minh-pho-cau.jpeg",
    alt: "pho cau - ho chi minh city, vietnam",
  },
  { src: "/south-korea-hotpot.jpeg", alt: "hotpot - south korea" },
  {
    src: "/vietnam-hoi-an-white-rose-dumplings.jpeg",
    alt: "white rose dumplings - hoi an, vietnam",
  },
  { src: "/japan-kyoto-potstickers.jpeg", alt: "potstickers - kyoto, japan" },
  { src: "/bali-uluwatu-green-curry.jpeg", alt: "green curry - uluwatu, bali" },
  { src: "/vietnam-hanoi-pho.jpeg", alt: "pho - hanoi, vietnam" },
  {
    src: "/bali-ubud-thai-stir-fry.jpeg",
    alt: "chicken stir fry - ubud, bali",
  },
  { src: "/bali-ubud-mie-goreng.jpeg", alt: "mie goreng - ubud, bali" },
];

const cTierImages: FoodImage[] = [
  {
    src: "/vietnam-hoi-an-white-rose-dumplings-2.jpeg",
    alt: "white rose dumplings - hoi an, vietnam",
  },
  {
    src: "/japan-kyoto-conveyor-belt-sushi.jpeg",
    alt: "conveyor belt sushi - kyoto, japan",
  },
  { src: "/bali-ubud-pad-thai.jpeg", alt: "pad thai - ubud, bali" },
  {
    src: "/vietnam-hanoi-chili-chicken.jpeg",
    alt: "chili chicken - hanoi, vietnam",
  },
  {
    src: "/vietnam-hanoi-beef-and-veg.jpeg",
    alt: "beef and veg - hanoi, vietnam",
  },
  {
    src: "/vietnam-hoi-an-spring-rolls.jpeg",
    alt: "spring rolls - hoi an, vietnam",
  },
  { src: "/japan-tokyo-taiyaki.jpeg", alt: "taiyaki - tokyo, japan" },
  {
    src: "/vietnam-hanoi-spring-rolls.jpeg",
    alt: "spring rolls - hanoi, vietnam",
  },
  {
    src: "/bali-uluwatu-beef-noodles.jpeg",
    alt: "beef noodles - uluwatu, bali",
  },
  { src: "/bali-ubud-chili-noodles.jpeg", alt: "chili noodles - ubud, bali" },
  {
    src: "/vietnam-hoi-an-beef-noodle-soup.jpeg",
    alt: "beef noodle soup - hoi an, vietnam",
  },
  {
    src: "/bali-uluwatu-pork-bao-buns.jpeg",
    alt: "pork bao buns - uluwatu, bali",
  },
  { src: "/japan-osaka-okonomiyaki.jpeg", alt: "okonomiyaki - osaka, japan" },
];

const dTierImages: FoodImage[] = [
  {
    src: "/bali-uluwatu-dragon-fruit-smoothie.jpeg",
    alt: "dragon fruit smoothie - uluwatu, bali",
  },
  { src: "/vietnam-hoi-an-banh-mi.jpeg", alt: "banh mi - hoi an, vietnam" },
  { src: "/bali-ubud-chili-fries.jpeg", alt: "chili fries - ubud, bali" },
  { src: "/japan-osaka-takoyaki.jpeg", alt: "takoyaki - osaka, japan" },
  { src: "/japan-tokyo-real-wasabi.jpeg", alt: "real wasabi - tokyo, japan" },
  {
    src: "/vietnam-ho-chi-minh-banh-mi.jpeg",
    alt: "banh mi - ho chi minh city, vietnam",
  },
  {
    src: "/vietnam-ho-chi-minh-banh-mi-2.jpeg",
    alt: "banh mi - ho chi minh city, vietnam",
  },
  { src: "/bali-uluwatu-breakfast.jpeg", alt: "egg breakfast - uluwatu, bali" },
  { src: "/bali-uluwatu-coconut.jpeg", alt: "coconut - uluwatu, bali" },
  {
    src: "/japan-osaka-7-11-rice-roll.jpeg",
    alt: "7-11 rice roll - osaka, japan",
  },
  {
    src: "/japan-osaka-piplup-ice-cream.jpeg",
    alt: "ice cream - osaka, japan",
  },
  {
    src: "/vietnam-ho-chi-minh-street-food.jpeg",
    alt: "street food - ho chi minh city, vietnam",
  },
];

const fTierImages: FoodImage[] = [
  { src: "/vietnam-hanoi-cobra.jpeg", alt: "cobra - hanoi, vietnam" },
  {
    src: "/vietnam-hanoi-snake-spring-rolls.jpeg",
    alt: "bamboo snake spring rolls - hanoi, vietnam",
  },
  {
    src: "/vietnam-ho-chi-minh-heart-meat.jpeg",
    alt: "noodles w/ heart meat - ho chi minh city, vietnam",
  },
];

type TierType = "tier-s" | "tier-a" | "tier-b" | "tier-c" | "tier-d" | "tier-f";

const tierMap: Record<TierType, FoodImage[]> = {
  "tier-s": sTierImages,
  "tier-a": aTierImages,
  "tier-b": bTierImages,
  "tier-c": cTierImages,
  "tier-d": dTierImages,
  "tier-f": fTierImages,
};

export default function FoodPage() {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  useEffect(() => {
    track("food_page_view");
  }, []);

  const toggleEnlarge = (src: string) => {
    setEnlargedImage(enlargedImage === src ? null : src);
  };

  const getTierConfig = (tier: TierType) => {
    const configs = {
      "tier-s": { label: "s", bgColor: "bg-red-300" },
      "tier-a": { label: "a", bgColor: "bg-orange-300" },
      "tier-b": { label: "b", bgColor: "bg-yellow-300" },
      "tier-c": { label: "c", bgColor: "bg-green-300" },
      "tier-d": { label: "d", bgColor: "bg-blue-300" },
      "tier-f": { label: "f", bgColor: "bg-purple-300" },
    };
    return configs[tier];
  };

  return (
    <PageLayout
      className="p-4"
      title={
        <>
          <h1 className="text-3xl font-bold mb-4">
            my food trip to bali, vietnam, and japan... ranked!
          </h1>
          <h2 className="text-lg mb-2">
            <em className="text-yellow-400">double click</em> each picture for
            more details.
          </h2>
          <h2 className="text-base opacity-80">
            disclaimer: everything was amazing except for f tier.
          </h2>
        </>
      }
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-0 border-4 border-gray-700 bg-black">
          {Object.keys(tierMap).map((tier) => {
            const tierType = tier as TierType;
            const config = getTierConfig(tierType);
            const tierImages = tierMap[tierType];

            return (
              <div
                key={tier}
                className="flex flex-col md:flex-row border-b-4 border-gray-700 last:border-b-4"
              >
                <div
                  className={`${config.bgColor} flex items-center justify-center py-4 md:py-0 md:px-16 border-r-0 md:border-r-4 border-gray-700 text-2xl font-bold text-black min-w-[80px]`}
                >
                  {config.label}
                </div>
                <div className="flex flex-wrap gap-2 p-2 min-h-[90px] flex-1 bg-black">
                  {tierImages.map((image, index) => (
                    <div
                      key={`${image.src}-${index}`}
                      className={`relative ${
                        enlargedImage === image.src ? "z-10" : ""
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={enlargedImage === image.src ? 300 : 80}
                        height={enlargedImage === image.src ? 300 : 80}
                        sizes={enlargedImage === image.src ? "300px" : "80px"}
                        priority={tierType === "tier-s"}
                        className={`rounded-lg transition-all cursor-pointer ${
                          enlargedImage === image.src
                            ? "w-[300px] h-[300px]"
                            : "w-20 h-20"
                        }`}
                        onDoubleClick={() => toggleEnlarge(image.src)}
                      />
                      {enlargedImage === image.src && (
                        <p className="text-white text-center text-sm mt-2 italic">
                          {image.alt}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
