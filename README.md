# evan's portfolio

a folder tree with my work, photos, and a few things i like. built with next.js and hosted at [evan-mavis.dev](https://evan-mavis.dev).

## run it

use node.js 24 and pnpm.

```bash
pnpm install
pnpm run dev
```

open [localhost:3000](http://localhost:3000). no env vars or services needed.

## amp orbs

`.agents/setup` installs node.js from `.nvmrc`, pnpm from `package.json`, locked
dependencies, and playwright chromium with its system libraries. amp caches the
prepared environment for fresh orbs; warm setup runs reuse the installed tools and
packages. `.agents/resume` checks the tools and dependencies without reinstalling.

Run `amp orb services ensure` to start the supervised dev server and get its portal
link. `.amp/services.yaml` defines the server and its health check.

## check it

- `pnpm run check` runs formatting, lint, types, and unit tests.
- `pnpm run test:e2e` runs browser tests. first run `pnpm exec playwright install chromium`.
- `pnpm run build` checks the production build.

[AGENTS.md](./AGENTS.md) has the repo rules. [the runbook](./docs/runbook.md) has deploy and rollback steps.
