import type { Metadata } from "next";
import { Jersey_10 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const jersey10 = Jersey_10({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jersey-10",
});

export const metadata: Metadata = {
  title: {
    default: "Evan Mavis // Portfolio",
    template: "%s | Evan Mavis",
  },
  description:
    "Full stack web developer based in NYC and CU Boulder alum. Specializing in Next.js, React, TypeScript, and modern web technologies.",
  keywords: [
    "web developer",
    "full stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "portfolio",
    "NYC developer",
  ],
  authors: [{ name: "Evan Mavis" }],
  creator: "Evan Mavis",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://evan-mavis.dev",
    title: "Evan Mavis - Full Stack Web Developer Portfolio",
    description:
      "Full stack web developer based in NYC and CU Boulder alum. Specializing in Next.js, React, TypeScript, and modern web technologies.",
    siteName: "Evan Mavis Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evan Mavis - Full Stack Web Developer Portfolio",
    description: "Full stack web developer based in NYC and CU Boulder alum.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jersey10.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
