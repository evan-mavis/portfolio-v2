import type { Metadata } from "next";
import { Jersey_10 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const jersey10 = Jersey_10({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jersey-10",
});

export const metadata: Metadata = {
  title: "Evan's Portfolio",
  description: "My simple portfolio!",
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
      </body>
    </html>
  );
}
