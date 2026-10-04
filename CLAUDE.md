# reader (frontend)

React 18 + TypeScript + Vite, styled with Tailwind and shadcn/ui (`src/components/ui/`). Uses pnpm.

- `pnpm dev` — start the dev server
- `pnpm build` — type-check and build
- `pnpm lint` — ESLint

## Backend

The API lives in a separate repo at `../reader-backend` (github.com/hydrarguru/reader-backend): Express + Sequelize + MySQL, deployed to https://reader-api.fly.dev.

- Routes: `../reader-backend/src/routes/` (Auth, User, Post, Community); logic in `src/functions/`, models in `src/models/`.
- Swagger docs at `/api-docs` are the source of truth for request and response shapes.
- Run it locally with `pnpm dev` in the backend repo; it serves http://localhost:10000.

## Talking to the backend

- All API calls go through `src/api/` and use `import.meta.env.VITE_BACKEND_URL`, set in `.env.local` (local backend or the Fly URL).
- Types in `src/types/` mirror `../reader-backend/src/types/`. When a backend type changes, update the frontend one to match.
- Token-protected routes expect `Authorization: Bearer <token>` (from `POST /auth/login`). Treat a 401 as "log in again".
