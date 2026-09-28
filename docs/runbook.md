# runbook

## something broke

1. open the site and check `curl -s https://evan-mavis.dev/api/health`. the response shows the live commit.
2. check the `portfolio-v2` project in vercel for deploys, logs, analytics, and speed insights.
3. if a deploy caused it, use **instant rollback** on the last good vercel deploy. then revert the bad commit on `main`.
4. close any `incident` issue with a short note on the cause. the `Uptime` action checks health every 30 minutes.

## a build fails

run `pnpm run check` and `pnpm run build` locally. check types, dependencies, and whether google fonts loaded at build time.

## an image or the resume is missing

check that its file is in `public/` and the path uses the exact filename. vercel paths are case-sensitive.

## change a tech icon

edit `ICON_SOURCES` in `scripts/generate-icons.mjs`, then run `pnpm run icons:generate` and commit the generated file. factory's logo is `public/factory-logo.svg` from factory.ai.

## add a photo

put it in `public/`, reference it from the travel or food page, and run `pnpm run images:optimize`. for travel photos, update the width and height in `app/travel/page.tsx` to match the optimized file.

## reset a stuck tree

clear the `portfolio-tree-state` key in your browser's `localStorage`. the tree returns to its default folders.

## security alert

check github's security tab. if a secret leaked, rotate it before removing it from git history.
