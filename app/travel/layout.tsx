import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Gallery",
  description:
    "A curated gallery of travel destinations I have visited including Bali, Vietnam, Japan, Italy, Costa Rica, and several states in the United States.",
  openGraph: {
    title: "Travel Gallery - Places You Should Visit",
    description:
      "A curated gallery of beautiful travel destinations from around the world.",
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
