// block oversized staged files. photos get more room.
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";

const KB = 1024;
const DEFAULT_LIMIT = 500 * KB;
const PUBLIC_LIMIT = 10 * 1024 * KB;

const files = execFileSync(
  "git",
  ["diff", "--cached", "--name-only", "--diff-filter=ACM"],
  { encoding: "utf8" },
)
  .split("\n")
  .filter(Boolean)
  .filter((file) => !/(pnpm-lock\.yaml)$/.test(file));

const oversized = files.filter((file) => {
  const limit = file.startsWith("public/") ? PUBLIC_LIMIT : DEFAULT_LIMIT;
  return statSync(file).size > limit;
});

if (oversized.length > 0) {
  console.error("Files exceed the size limit:\n  " + oversized.join("\n  "));
  process.exit(1);
}
