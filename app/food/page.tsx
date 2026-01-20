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
  { src: "/japan-osaka-scallop.jpeg", alt: "Scallop - Osaka, Japan" },
  { src: "/japan-kyoto-ramen.jpeg", alt: "Ramen - Kyoto, Japan" },
  { src: "/japan-tokyo-tuna-market.jpeg", alt: "Tuna Market - Tokyo, Japan" },
  { src: "/japan-tokyo-wagyu.jpeg", alt: "Wagyu Beef - Tokyo, Japan" },
  {
    src: "/japan-osaka-a5-kobe-wagyu-skewers.jpeg",
    alt: "A5 Kobe Wagyu Skewers - Osaka, Japan",
  },
  {
    src: "/bali-ubud-dragon-fruit-bfast-bowl.jpeg",
    alt: "Dragon Fruit Breakfast Bowl - Ubud, Bali",
  },
  { src: "/japan-osaka-fatty-toro.jpeg", alt: "Fatty Toro - Osaka, Japan" },
  {
    src: "/vietnam-hoi-an-cao-lau-noodles.jpeg",
    alt: "Cao Lau Noodles - Hoi An, Vietnam",
  },
  {
    src: "/bali-uluwatu-mie-goreng-and-pork-buns.jpeg",
    alt: "Mie Goreng and Pork Buns - Uluwatu, Bali",
  },
  { src: "/japan-tokyo-ramen.jpeg", alt: "Ramen - Tokyo, Japan" },
  {
    src: "/vietnam-tam-coc-indian.jpeg",
    alt: "Tikka Masala - Tam Coc, Vietnam",
  },
];

const aTierImages: FoodImage[] = [
  { src: "/japan-kyoto-wagyu-night.jpeg", alt: "Wagyu Night! - Kyoto, Japan" },
  {
    src: "/bali-ubud-breakfast-scramble.jpeg",
    alt: "Chili Egg Scramble - Ubud, Bali",
  },
  { src: "/japan-osaka-nigiri.jpeg", alt: "Nigiri - Osaka, Japan" },
  { src: "/bali-uluwatu-potstickers.jpeg", alt: "Potstickers - Uluwatu, Bali" },
  {
    src: "/japan-tokyo-omakase-unagi.jpeg",
    alt: "Omakase, Unagi - Tokyo, Japan",
  },
  { src: "/japan-tokyo-nigiri.jpeg", alt: "Nigiri - Tokyo, Japan" },
  { src: "/japan-osaka-dumplings.jpeg", alt: "Dumplings - Osaka, Japan" },
  {
    src: "/vietnam-ho-chi-minh-pho-dau.jpeg",
    alt: "Pho Dau - Ho Chi Minh City, Vietnam",
  },
  {
    src: "/vietnam-hanoi-rich-dipping-noodles.jpeg",
    alt: "Rich Dipping Noodles - Hanoi, Vietnam",
  },
  { src: "/bali-uluwatu-mie-goreng.jpeg", alt: "Mie Goreng - Uluwatu, Bali" },
  { src: "/japan-kyoto-ramen-2.jpeg", alt: "Ramen - Kyoto, Japan" },
];

const bTierImages: FoodImage[] = [
  { src: "/bali-ubud-indian.jpeg", alt: "Tikka Masala - Ubud, Bali" },
  {
    src: "/japan-kyoto-cold-soba-and-tempura.jpeg",
    alt: "Cold Soba and Tempura - Kyoto, Japan",
  },
  { src: "/japan-tokyo-ichiran.jpeg", alt: "Ichiran Ramen - Tokyo, Japan" },
  {
    src: "/japan-osaka-cold-breakfast-noodles.jpeg",
    alt: "Cold Breakfast Noodles - Osaka, Japan",
  },
  {
    src: "/vietnam-ho-chi-minh-pho-cau.jpeg",
    alt: "Pho Cau - Ho Chi Minh City, Vietnam",
  },
  { src: "/south-korea-hotpot.jpeg", alt: "Hotpot - South Korea" },
  {
    src: "/vietnam-hoi-an-white-rose-dumplings.jpeg",
    alt: "White Rose Dumplings - Hoi An, Vietnam",
  },
  { src: "/japan-kyoto-potstickers.jpeg", alt: "Potstickers - Kyoto, Japan" },
  { src: "/bali-uluwatu-green-curry.jpeg", alt: "Green Curry - Uluwatu, Bali" },
  { src: "/vietnam-hanoi-pho.jpeg", alt: "Pho - Hanoi, Vietnam" },
  {
    src: "/bali-ubud-thai-stir-fry.jpeg",
    alt: "Chicken Stir Fry - Ubud, Bali",
  },
  { src: "/bali-ubud-mie-goreng.jpeg", alt: "Mie Goreng - Ubud, Bali" },
];

const cTierImages: FoodImage[] = [
  {
    src: "/vietnam-hoi-an-white-rose-dumplings-2.jpeg",
    alt: "White Rose Dumplings - Hoi An, Vietnam",
  },
  {
    src: "/japan-kyoto-conveyor-belt-sushi.jpeg",
    alt: "Conveyor Belt Sushi - Kyoto, Japan",
  },
  { src: "/bali-ubud-pad-thai.jpeg", alt: "Pad Thai - Ubud, Bali" },
  {
    src: "/vietnam-hanoi-chili-chicken.jpeg",
    alt: "Chili Chicken - Hanoi, Vietnam",
  },
  {
    src: "/vietnam-hanoi-beef-and-veg.jpeg",
    alt: "Beef and Veg - Hanoi, Vietnam",
  },
  {
    src: "/vietnam-hoi-an-spring-rolls.jpeg",
    alt: "Spring Rolls - Hoi An, Vietnam",
  },
  { src: "/japan-tokyo-taiyaki.jpeg", alt: "Taiyaki - Tokyo, Japan" },
  {
    src: "/vietnam-hanoi-spring-rolls.jpeg",
    alt: "Spring Rolls - Hanoi, Vietnam",
  },
  {
    src: "/bali-uluwatu-beef-noodles.jpeg",
    alt: "Beef Noodles - Uluwatu, Bali",
  },
  { src: "/bali-ubud-chili-noodles.jpeg", alt: "Chili Noodles - Ubud, Bali" },
  {
    src: "/vietnam-hoi-an-beef-noodle-soup.jpeg",
    alt: "Beef Noodle Soup - Hoi An, Vietnam",
  },
  {
    src: "/bali-uluwatu-pork-bao-buns.jpeg",
    alt: "Pork Bao Buns - Uluwatu, Bali",
  },
  { src: "/japan-osaka-okonomiyaki.jpeg", alt: "Okonomiyaki - Osaka, Japan" },
];

const dTierImages: FoodImage[] = [
  {
    src: "/bali-uluwatu-dragon-fruit-smoothie.jpeg",
    alt: "Dragon Fruit Smoothie - Uluwatu, Bali",
  },
  { src: "/vietnam-hoi-an-banh-mi.jpeg", alt: "Banh Mi - Hoi An, Vietnam" },
  { src: "/bali-ubud-chili-fries.jpeg", alt: "Chili Fries - Ubud, Bali" },
  { src: "/japan-osaka-takoyaki.jpeg", alt: "Takoyaki - Osaka, Japan" },
  { src: "/japan-tokyo-real-wasabi.jpeg", alt: "Real Wasabi - Tokyo, Japan" },
  {
    src: "/vietnam-ho-chi-minh-banh-mi.jpeg",
    alt: "Banh Mi - Ho Chi Minh City, Vietnam",
  },
  {
    src: "/vietnam-ho-chi-minh-banh-mi-2.jpeg",
    alt: "Banh Mi - Ho Chi Minh City, Vietnam",
  },
  { src: "/bali-uluwatu-breakfast.jpeg", alt: "Egg Breakfast - Uluwatu, Bali" },
  { src: "/bali-uluwatu-coconut.jpeg", alt: "Coconut - Uluwatu, Bali" },
  {
    src: "/japan-osaka-7-11-rice-roll.jpeg",
    alt: "7-11 Rice Roll - Osaka, Japan",
  },
  {
    src: "/japan-osaka-piplup-ice-cream.jpeg",
    alt: "Ice Cream - Osaka, Japan",
  },
  {
    src: "/vietnam-ho-chi-minh-street-food.jpeg",
    alt: "Street Food - Ho Chi Minh City, Vietnam",
  },
];

const fTierImages: FoodImage[] = [
  { src: "/vietnam-hanoi-cobra.jpeg", alt: "Cobra - Hanoi, Vietnam" },
  {
    src: "/vietnam-hanoi-snake-spring-rolls.jpeg",
    alt: "Bamboo Snake Spring Rolls - Hanoi, Vietnam",
  },
  {
    src: "/vietnam-ho-chi-minh-heart-meat.jpeg",
    alt: "Noodles w/ Heart Meat - Ho Chi Minh City, Vietnam",
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
      "tier-s": { label: "S", bgColor: "bg-red-300" },
      "tier-a": { label: "A", bgColor: "bg-orange-300" },
      "tier-b": { label: "B", bgColor: "bg-yellow-300" },
      "tier-c": { label: "C", bgColor: "bg-green-300" },
      "tier-d": { label: "D", bgColor: "bg-blue-300" },
      "tier-f": { label: "F", bgColor: "bg-purple-300" },
    };
    return configs[tier];
  };

  return (
    <PageLayout
      className="p-4"
      title={
        <>
          <h1 className="text-3xl font-bold mb-4">
            My Food Trip to Bali, Vietnam, and Japan... Ranked!
          </h1>
          <h2 className="text-lg mb-2">
            <em className="text-yellow-400">Double click</em> each picture for
            more details.
          </h2>
          <h2 className="text-base opacity-80">
            DISCLAIMER: Everything was amazing except for F tier.
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
                        className={`rounded-lg transition-all cursor-pointer ${
                          enlargedImage === image.src
                            ? "w-[300px] h-[300px]"
                            : "w-20 h-20"
                        }`}
                        onDoubleClick={() => toggleEnlarge(image.src)}
                        quality={95}
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
