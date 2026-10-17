"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useMountEffect } from "@/lib/use-mount-effect";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  // next-themes can resolve before hydration. Keep the first client render
  // identical to the server's disabled placeholder.
  const [mounted, setMounted] = useState(false);

  useMountEffect(() => {
    setMounted(true);
  });

  const handleToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
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
        className="toggle-icon text-primary"
        data-active={!isDark}
      />

      <Moon
        key={`moon-${resolvedTheme}`}
        className="toggle-icon text-primary"
        data-active={isDark}
      />

      <span className="sr-only">toggle theme</span>
    </Button>
  );
}
