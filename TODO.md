# TODO

- Self-service password reset: a "Forgot password" flow with emailed, single-use, expiring reset tokens. Needs new routes and a migration in `reader-backend`, plus an email provider, which the privacy policy must then list as a processor. Until then, the login page links to the contact address in `src/lib/contact.ts`.
- Show the current email in Settings. No route returns the signed-in user's own email yet (`GET /user/:id` leaves it out), so this needs a token-protected `GET /user/me` in `reader-backend`.
- Search and sort posts within a community, and paginate long feeds.
- Follow communities and list them in the menu (the old "Starred communities" placeholder was removed in 1.12.3).
- List your own posts and comments on the profile page.
- Deleting an account: ask the user to type their username to confirm, and offer a copy of their data first, as the privacy policy promises.
- Settings: show one form at a time (username, email, password) instead of all at once.
- Explain the `c/` prefix to first-time visitors.
