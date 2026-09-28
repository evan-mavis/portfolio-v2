// Fails when AGENTS.md or README.md reference an npm script or a repo path that no longer exists.
import { existsSync, readFileSync } from "node:fs";

const scripts = JSON.parse(readFileSync("package.json", "utf8")).scripts;
const builtins = new Set(["install", "ci", "test", "start", "run"]);
const errors = [];

for (const doc of ["AGENTS.md", "README.md"]) {
  const text = readFileSync(doc, "utf8");

  for (const [, name] of text.matchAll(/npm run ([\w:-]+)/g)) {
    if (!scripts[name]) errors.push(`${doc}: unknown script "npm run ${name}"`);
  }
  for (const [, name] of text.matchAll(/`npm (\w+)`/g)) {
    if (!builtins.has(name) && !scripts[name]) {
      errors.push(`${doc}: unknown command "npm ${name}"`);
    }
  }
  for (const [, path] of text.matchAll(
    /`((?:app|components|lib|docs|e2e|scripts|\.github)\/[\w./-]+)`/g,
  )) {
    if (!path.includes("*") && !existsSync(path.replace(/\/$/, ""))) {
      errors.push(`${doc}: missing path "${path}"`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("AGENTS.md and README.md references are valid.");
