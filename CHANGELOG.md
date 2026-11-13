# Changelog

All notable changes to this project. Follows [Semantic Versioning](https://semver.org/).
Versions before 1.11.0 were assigned retroactively from the commit history: new features are a minor bump, fixes and dependency updates a patch bump.

## [1.12.6] - 2026-11-13
### Fixed
- Post bodies, comments and the privacy policy keep lines to a readable length (about 65 characters) instead of running to 85-95.
- Comments use the same 16px body text as posts, and feed excerpts use the 14px small body size, matching the design system.
- The privacy policy is set in full-strength ink instead of muted grey, and the home headline wraps in balanced lines.

## [1.12.5] - 2026-11-13
### Fixed
- The login page has a "Can't log in? Email us" link, so people locked out of an account have a way to get help.
- The privacy policy says which email address to use for data requests (copy, correction, deletion).

## [1.12.4] - 2026-11-13
### Fixed
- The theme toggle is a single button; it used to sit inside a second, unnamed button that added an extra tab stop and a console error on every page.
- The mobile menu has a labelled close button, valid roles and focus rings on its links, lists every community alphabetically instead of three random ones, and closes when you pick a link.
- The mobile menu uses the same labels as the header ("Settings", "Log out"), makes "Sign up" its one coral button, and drops its duplicate theme toggle and the old 2024 portfolio line.
- The menu button uses a menu icon and only shows below 640px, where the header has no room for the account buttons.

## [1.12.3] - 2026-11-13
### Fixed
- The header "Sign up" is an outline button, so each page keeps one coral action.
- The 404 numeral uses coral ink instead of coral text, which failed contrast.
- The login page explains what logging in is for ("Log in to post, comment and vote.") instead of greeting every visitor as returning.
- The mobile drawer no longer shows a placeholder "Starred communities" section.

## [1.12.2] - 2026-11-13
### Added
- `PRODUCT.md` and `DESIGN.md` describe the product and the Reader design system, with `.impeccable/design.json` alongside.
### Fixed
- Post titles in feeds are 20px and inputs, textareas and dialog close buttons have 6px corners, matching the design system.

## [1.12.1] - 2026-11-03
### Changed
- README tech stack now lists the libraries actually in use (React Router, Radix UI, React Hook Form, Zod, Vitest and others), updates the backend to Express 5 + Drizzle, and adds setup commands.

## [1.12.0] - 2026-10-27
### Added
- New posts can have an image URL; creating and editing posts now use the same form.
- Unit tests for the API cache (`pnpm test`, using Vitest).
### Changed
- The create-post popup now closes with Escape and keeps keyboard focus inside it.
- Logging in or out in one tab now applies to all open tabs.
- Removed 31 unused dependencies and 34 unused UI components, plus other dead code.
### Fixed
- Post titles are limited to 50 characters when creating a post, matching the database; longer titles used to fail with a generic error.
- Logging out in another tab no longer traps this tab in a redirect loop between the login page and the current page.
- The app no longer shows a blank page when the browser blocks site storage.
- Post times use correct plurals ("1 day ago", "yesterday"), and posts without a date show "Unknown date" instead of "0 seconds ago".
- Community pages no longer show placeholder rules.
- Login and sign-up show the server's "too many attempts" message when rate limited (backend 2.0.0), instead of asking to try again.

## [1.11.0] - 2026-10-18
### Changed
- Project declared stable; version set to 1.11.0 (continues from 0.11.0).

## [0.11.0] - 2026-10-18
### Added
- Edit and delete your own posts; admins can delete any post (#13).
- Edit your own comments (shown as "edited"); admins can delete any comment (#13).
- Change your username, email and password, and delete your account, in Settings (#13).

## [0.10.0] - 2026-10-12
### Added
- Admin panel for creating, editing and deleting communities, shown only to admins (#11).

## [0.9.0] - 2026-10-11
### Added
- Show, add and delete comments on the post page, and comment counts on post cards (#10).

## [0.8.1] - 2026-10-11
### Fixed
- Community sidebar layout on mobile; rules show above posts on small screens (#9).

## [0.8.0] - 2026-10-11
### Added
- Site footer and privacy policy page (#8).

## [0.7.0] - 2026-10-11
### Changed
- Redesign with the Reader design system: new colours and typography, restyled profile and settings, and the real layout shown while the site first loads (#5, #6).
- README updated with the current tech stack (#7).

## [0.6.0] - 2026-10-05
### Added
- One vote per user per post, using the backend's vote API (#4).

## [0.5.1] - 2026-10-04
### Fixed
- Deep links and reloads on Netlify.

## [0.5.0] - 2026-10-04
### Added
- Route-based navigation, sign-up and login against the backend, and API caching (#3).

## [0.4.2] - 2026-03-31
### Changed
- Updated dependencies.

## [0.4.1] - 2025-09-02
### Fixed
- Fetching community posts, and reloading the page after submitting a post.

## [0.4.0] - 2024-12-19
### Added
- Routing with react-router and pages for the different parts of the app.
- Mobile sidebar menu, tooltips (including full dates on hover), toasts when creating a post, and a favicon.

## [0.3.0] - 2024-11-16
### Added
- Community pages with skeleton loading and a responsive info panel.
- Voting on posts through the API, a post modal and a create-post modal.

## [0.2.0] - 2024-09-25
### Added
- Image posts, post voting, light/dark theme and a new navbar.

## [0.1.0] - 2024-06-13
### Added
- First working app: list communities and their posts, create posts and communities, login and register forms.
