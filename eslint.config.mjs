import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      complexity: ["error", { max: 15 }],
      "max-depth": ["error", 4],
      // PortfolioTree.tsx is a large declarative JSX tree; split before exceeding this.
      "max-lines": [
        "error",
        { max: 700, skipBlankLines: true, skipComments: true },
      ],
      "no-warning-comments": [
        "warn",
        { terms: ["todo", "fixme", "hack", "xxx"], location: "start" },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        { selector: "typeLike", format: ["PascalCase"] },
        // Object keys mirror external data (CSS props, icon slugs, HTTP headers).
        { selector: ["objectLiteralProperty", "typeProperty"], format: null },
        { selector: "import", format: null },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
