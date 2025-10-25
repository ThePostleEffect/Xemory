# Xemory MVP Monorepo

This repository contains the monorepo scaffold for the **Xemory** Minimum Viable Product (MVP). It includes separate apps for the web frontend and API backend, shared packages, infrastructure configuration, and documentation.

## Structure

- `apps/web` – Next.js application written in TypeScript with Tailwind CSS and shadcn UI.
- `apps/api` – Node.js API using Express with placeholder routes for video upload, persona creation, and chat interactions.
- `packages/sdk` – Shared TypeScript types and API client.
- `packages/config` – Shared configuration (ESLint, Prettier, TypeScript).
- `packages/ui` – Shared React UI primitives (optional).
- `infra` – Containerization and deployment configuration.
- `prisma` – Database schema and migrations (for Postgres/Prisma).
- `docs` – Architectural and planning documents.
- `.github/workflows` – GitHub Actions workflows for CI/CD.

You can update and extend these files as development progresses.
