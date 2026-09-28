# Privacy and data handling

This site collects as little data as possible.

## What is collected

- **Vercel Web Analytics**: page views and named click events (`resume_click`, `linkedin_click`, and so on). Vercel Analytics sets no cookies and does not store IP addresses or build cross-site profiles. See [Vercel's privacy policy](https://vercel.com/docs/analytics/privacy-policy).
- **Theme preference**: stored only in the visitor's own `localStorage` by `next-themes`. It is never sent anywhere.

## What is not collected

- No forms, accounts, cookies, or server-side storage of visitor data.
- `track()` calls must never include personal data (names, emails, free text) in event properties. Reviewers should reject changes that add it.

## Retention

Vercel keeps analytics data according to the project's plan. No other visitor data exists.

## Requests

There is no stored personal data to export or delete. Questions go to the email linked on the site.

## Logs

The only server code is `/api/health`. It writes a debug line containing the request ID and commit SHA. All server logging goes through `lib/logger.ts`, which writes JSON lines and redacts sensitive keys (emails, tokens, cookies, auth headers) before writing.
