# how the site fits together

next.js serves the portfolio from vercel. there is no database or login.

- `/` renders the folder tree. `components/portfolio-tree-data.tsx` holds the folders and files; `components/PortfolioTree.tsx` renders them.
- `TreeStateProvider` lives in `app/layout.tsx`, so a trip to `/travel` or `/food` keeps the tree state. `lib/tree-state.ts` also saves it in `localStorage` as `portfolio-tree-state` for reloads.
- the avatar opens a modal through a portal. the small avatar is round; the large photo shows the full square image.
- tech icons come from `scripts/generate-icons.mjs` into `lib/icons-generated.ts`. `public/factory-logo.svg` is factory's own logo. no iconify api call happens in the browser.
- gallery photos live in `public/`. `next/image` reserves their layout space. `pnpm run images:optimize` shrinks large photos and strips metadata.
- `/api/health` returns the live commit for uptime checks. link clicks send named events to vercel analytics without personal data.

pushing `main` starts a production deploy. see [the runbook](./runbook.md) if one goes wrong.
