import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "travel gallery",
  description:
    "a curated gallery of travel destinations i have visited including bali, vietnam, japan, italy, costa rica, and several states in the united states.",
  openGraph: {
    title: "travel gallery - places you should visit",
    description:
      "a curated gallery of beautiful travel destinations from around the world.",
    type: "website",
  },
};

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
