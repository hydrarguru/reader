# Changelog

All notable changes to this project. Follows [Semantic Versioning](https://semver.org/).
Versions before 0.11.0 were assigned retroactively from the commit history: new features are a minor bump, fixes and dependency updates a patch bump.

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
