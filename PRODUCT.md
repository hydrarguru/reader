# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Community members:** people who sign up to join communities, post, comment and vote. Reader must hold up for real, ongoing use, not just a demo.
- **Portfolio reviewers:** employers and peers judging the project as full-stack work. They browse without an account and look at craft, completeness and polish.

## Product Purpose

Reader is a community discussion site inspired by Reddit: create or join a community and share interests with like-minded people. Success means members can comfortably read and discuss, and a reviewer sees a finished, trustworthy product rather than a clone exercise.

## Positioning

Reader is a calm, reading-first take on community discussion, organized around small, curated communities. Posts should read like something worth reading, not items in an endless feed, and there is no engagement bait. Communities are created by admins and carry their own rules, closer to a well-kept forum than a sprawling platform.

## Operating Context

- Live at https://reader-app.netlify.app (frontend on Netlify) with the API at https://reader-api.fly.dev (Express 5 + Drizzle ORM + MySQL, repo `../reader-backend`).
- Anonymous visitors can browse communities and posts; posting, commenting and voting need an account (`POST /auth/login`, Bearer token, a 401 means "log in again").
- Admins manage communities from the admin panel and can delete any post or comment.
- Light theme is the default, with a dark theme toggle stored in the browser.

## Capabilities and Constraints

- Communities: browse, view rules and information; admins create, edit and delete them.
- Posts: create with an optional image URL, edit and delete your own; titles are limited to 50 characters (database limit).
- Comments: add, edit (shown as "edited") and delete; comment counts on post cards.
- Votes: one vote per user per post.
- Accounts: sign up, log in, profile, and settings to change username, email and password or delete the account. Sessions sync across browser tabs.
- Stack is fixed: React 18 + TypeScript + Vite, Tailwind and shadcn/ui (`src/components/ui/`). Do not add other UI libraries.
- Responsive layout with a mobile drawer exists; how much use happens on phones is undecided.

## Brand Commitments

- Name: **Reader**.
- Privacy promise (from `src/components/Pages/PrivacyPage.tsx`): no ads, no tracking or advertising cookies, no selling or sharing data with third parties. This binds every future feature.
- Data handling follows the EU GDPR as described on the privacy page.

## Evidence on Hand

- Real product: the deployed site, `CHANGELOG.md` (version history from 0.x to 1.12.0) and the privacy policy page.
- Source repo linked from the footer: https://github.com/hydrarguru/reader.
- No user counts, testimonials, press or usage data exist. Do not invent any.

## Product Principles

1. Reading comes first: content outranks chrome, counts and calls to action.
2. Small and curated beats big and noisy: communities have owners and rules.
3. Finished means finished: every flow, empty state and error should look shipped, because reviewers judge completeness.
4. Respect people's attention and data: no ads, no tracking, no manipulative engagement patterns.

## Accessibility & Inclusion

WCAG 2.2 AA is a hard requirement for all surfaces, in both light and dark themes.
