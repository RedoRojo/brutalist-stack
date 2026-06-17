# Agent Guide — brutalist-stack / portanti

## Quick start
```bash
cp .env.example .env   # set DATABASE_URL (PostgreSQL) and ADMIN_PASSWORD
npm install            # postinstall runs prisma generate
npx prisma db push     # push schema to DB
npm run dev            # next dev (Turbopack)
```

## Available commands
| Script | Command |
|--------|---------|
| `npm run dev` | `next dev` |
| `npm run build` | `next build` |
| `npm start` | `next start` |
| `npm run lint` | `eslint` (v9 flat config) |

No test, typecheck (`tsc --noEmit`), or formatter scripts exist.

## Architecture
- Single Next.js 16 App Router app (not a monorepo)
- PostgreSQL + Prisma 7.8; `src/lib/db.ts` uses `PrismaPg` adapter with `pg.Pool`, global singleton in dev
- Custom regex-based Markdown parser at `src/components/Markdown.tsx`
- Session auth via SHA-256 hashed `ADMIN_PASSWORD` in httpOnly cookie (no OAuth, no DB sessions)
- All public pages: `export const revalidate = 0` (fully dynamic, no ISR/SSG)

## Key quirks
- **Middleware inactive**: `src/proxy.ts` exports `proxy` but Next.js middleware must be a default export from `src/middleware.ts`
- **Prisma schema only supports PostgreSQL** despite `@prisma/adapter-better-sqlite3` in deps (vestigial)
- **Seed script** (`prisma/seed.ts`) uses `pg.Pool` directly, not `prisma db seed` with datasource config from `prisma.config.ts`
- **Tailwind v4**: uses `@import "tailwindcss"` in CSS, no `tailwind.config.*` file
- **ESLint 9 flat config** in `eslint.config.mjs`
- No pre-commit, CI, or deployment config in this repo (deploy targets Vercel per DEPLOYMENT.md)
- Brutalist utility classes in `src/app/globals.css`: `.border-brutal`, `.shadow-brutal`, `.btn-brutal-primary`
