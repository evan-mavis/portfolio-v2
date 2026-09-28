import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "food trip tier list",
  description:
    "ranked tier list of food from my travels to bali, vietnam, and japan. discover the best culinary experiences from s-tier to f-tier.",
  openGraph: {
    title: "food tier list - my food trip to bali, vietnam, and japan",
    description:
      "ranked tier list of food from my travels to bali, vietnam, and japan.",
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
