# privacy

this site has no forms, accounts, or database.

vercel analytics counts page views and named clicks. it doesn't set cookies or store ip addresses. [vercel explains its policy here](https://vercel.com/docs/analytics/privacy-policy). the theme and folder state live in your browser's `localStorage` and aren't sent to me.

click events must never include names, emails, or free text. `/api/health` logs a request id and commit sha; `lib/logger.ts` redacts sensitive keys.

there's no account data to export or delete. questions can go to the email link on the site.
