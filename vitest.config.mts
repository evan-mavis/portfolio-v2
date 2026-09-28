import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["{app,components,lib}/**/*.test.{ts,tsx}"],
    pool: "threads",
    isolate: true,
    sequence: { shuffle: true },
    retry: process.env.CI ? 2 : 0,
    reporters: process.env.CI
      ? ["default", "junit", "github-actions"]
      : ["default"],
    outputFile: { junit: "./test-results/junit.xml" },
    coverage: {
      provider: "v8",
      include: ["lib/**", "components/**"],
      exclude: ["components/ui/**", "**/*.test.*"],
      reporter: ["text", "json-summary", "lcov"],
      thresholds: { lines: 60, functions: 60, branches: 60, statements: 60 },
    },
  },
});
