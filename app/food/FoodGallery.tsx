"use client";

import { useState } from "react";
import Image from "next/image";
import { FOOD_TIERS } from "./food-data";

export default function FoodGallery() {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const toggleImage = (src: string) => {
    setEnlargedImage((current) => (current === src ? null : src));
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col border-4 border-gray-700 bg-black">
        {FOOD_TIERS.map((tier, tierIndex) => (
          <div
            key={tier.label}
            className="flex flex-col border-b-4 border-gray-700 md:flex-row"
          >
            <div
              className={`${tier.className} flex min-w-[80px] items-center justify-center border-r-0 border-gray-700 py-4 text-2xl font-bold text-black md:border-r-4 md:px-16 md:py-0`}
            >
              {tier.label}
            </div>
            <div className="flex min-h-[90px] flex-1 flex-wrap gap-2 bg-black p-2">
              {tier.images.map((image) => {
                const isEnlarged = enlargedImage === image.src;
                const size = isEnlarged ? 300 : 80;

                return (
                  <div
                    key={image.src}
                    className={`relative ${isEnlarged ? "z-10" : ""}`}
                  >
                    <button
                      type="button"
                      aria-label={`enlarge ${image.alt}`}
                      aria-pressed={isEnlarged}
                      className="block cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      onDoubleClick={() => toggleImage(image.src)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleImage(image.src);
                        }
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={size}
                        height={size}
                        sizes={`${size}px`}
                        priority={tierIndex === 0}
                        className={`rounded-lg transition-all ${isEnlarged ? "h-[300px] w-[300px]" : "h-20 w-20"}`}
                      />
                    </button>
                    {isEnlarged && (
                      <p className="mt-2 text-center text-sm italic text-white">
                        {image.alt}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
