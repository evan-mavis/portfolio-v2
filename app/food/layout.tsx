import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food Tier List - My Food Trip to Bali, Vietnam, and Japan",
  description:
    "Ranked tier list of amazing food from my travels to Bali, Vietnam, and Japan. Discover the best culinary experiences from S-tier to F-tier.",
  openGraph: {
    title: "Food Tier List - My Food Trip to Bali, Vietnam, and Japan",
    description:
      "Ranked tier list of amazing food from my travels to Bali, Vietnam, and Japan.",
    type: "website",
  },
};

export default function FoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
