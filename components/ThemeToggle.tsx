"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useMountEffect } from "@/lib/use-mount-effect";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  // wait for mount so server and client agree on the first theme render.
  const [mounted, setMounted] = useState(false);

  useMountEffect(() => {
    setMounted(true);
  });

  const handleToggle = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  if (!mounted || !resolvedTheme) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">toggle theme</span>
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="relative overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95"
    >
      <Sun
        key={`sun-${resolvedTheme}`}
        className={`absolute h-[1.2rem] w-[1.2rem] text-orange-500 ${
          !isDark ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{
          animation: !isDark
            ? "theme-pop 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            : undefined,
        }}
      />

      <Moon
        key={`moon-${resolvedTheme}`}
        className={`absolute h-[1.2rem] w-[1.2rem] text-purple-500 ${
          isDark ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{
          animation: isDark
            ? "theme-pop 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            : undefined,
        }}
      />

      <span className="sr-only">toggle theme</span>
    </Button>
  );
}
