# TODO

- Self-service password reset: a "Forgot password" flow with emailed, single-use, expiring reset tokens. Needs new routes and a migration in `reader-backend`, plus an email provider, which the privacy policy must then list as a processor. Until then, the login page links to the contact address in `src/lib/contact.ts`.
