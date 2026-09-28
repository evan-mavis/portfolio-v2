import type { Metadata } from "next";
import { Jersey_10 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TreeStateProvider } from "@/components/TreeStateProvider";

const jersey10 = Jersey_10({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jersey-10",
});

export const metadata: Metadata = {
  title: {
    default: "evan mavis // portfolio",
    template: "evan mavis // %s",
  },
  description:
    "full stack web developer based in nyc and cu boulder alum. specializing in next.js, react, typescript, and modern web technologies.",
  keywords: [
    "web developer",
    "full stack developer",
    "next.js",
    "react",
    "typescript",
    "portfolio",
    "nyc developer",
  ],
  authors: [{ name: "evan mavis" }],
  creator: "evan mavis",
  openGraph: {
    type: "website",
    url: "https://evan-mavis.dev",
    title: "evan mavis - full stack web developer portfolio",
    description:
      "full stack web developer based in nyc and cu boulder alum. specializing in next.js, react, typescript, and modern web technologies.",
    siteName: "evan mavis portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "evan mavis - full stack web developer portfolio",
    description: "full stack web developer based in nyc and cu boulder alum.",
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
  icons: {
    icon: [{ url: "/favicon-circle.svg", type: "image/svg+xml" }],
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
          <TreeStateProvider>{children}</TreeStateProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
