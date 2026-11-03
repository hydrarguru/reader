# Reader
[![Netlify Status](https://api.netlify.com/api/v1/badges/e581f970-3e5f-4f08-87a6-51336325e931/deploy-status)](https://app.netlify.com/sites/reader-app/deploys)

A project that takes inspiration from Reddit. Create or join a community and share your interests with other like-minded individuals.
View the project [here](https://reader-app.netlify.app/).

## Tech Stack

### Frontend
- **Framework:** [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/), built with [Vite](https://vite.dev/) (SWC plugin)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) with `tailwindcss-animate`, `tailwind-merge`, `clsx` and `class-variance-authority`
- **UI components:** [shadcn/ui](https://ui.shadcn.com/) built on [Radix UI](https://www.radix-ui.com/) primitives, [Vaul](https://vaul.emilkowal.ski/) for drawers, [Lucide](https://lucide.dev/) icons
- **Forms and validation:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) schemas
- **Data fetching:** the browser Fetch API with a small in-memory cache (`src/api/`, `src/lib/cache.ts`)
- **Tooling:** pnpm, ESLint, [Vitest](https://vitest.dev/)
- **Hosting:** Netlify

### Backend
Express 5 + Drizzle ORM with a MySQL database, JWT auth via `jose`, and Swagger API docs, deployed on Fly.io. View the backend repo [here](https://github.com/hydrarguru/reader-backend).

## Getting Started
```bash
pnpm install
pnpm dev      # start the dev server
pnpm build    # type-check and build
pnpm lint     # ESLint
pnpm test     # unit tests (Vitest)
```
Set `VITE_BACKEND_URL` in `.env.local` to the backend URL (a local backend or https://reader-api.fly.dev).
