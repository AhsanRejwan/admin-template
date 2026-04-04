# Setup

Use this file for local setup, runtime configuration, and migration notes.

## Stack

- React `19`
- Vite `7`
- TypeScript
- Bootstrap `5`
- React-Bootstrap
- Sass
- React Router
- React Hook Form
- ApexCharts
- Google Maps bindings
- SWR

## Primary Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Current Runtime Shape

The repo is intentionally in a transitional state:

- [`src/App.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/App.tsx) forwards to [`src/template/App.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/App.tsx)
- [`src/index.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/index.tsx) imports [`src/template/index.scss`](/Users/ahsan/Projects/Personal/admin-template/src/template/index.scss)

That means the template still powers the app shell today, but the intended workflow is to extract product code out of `src/template` over time.

## Intended Development Flow

Use the repo like this:

1. Keep the original template implementation under [`src/template`](/Users/ahsan/Projects/Personal/admin-template/src/template).
2. Treat `src/template` as a namespaced reference library.
3. When building a product feature, copy the relevant page, section, component, route, style, or utility into app-owned locations under `src/`.
4. Trim the copied code down to only what the app needs.
5. Move the app entrypoints away from the template namespace once enough product code exists.
6. Delete `src/template` when nothing in the app depends on it anymore.

The repo should end as a normal app, not as a permanently customized template clone.

## Environment Variables

Defined through `.env` and `.env.example` when needed.

Important variables:

- `VITE_APP_BASE_NAME`
- `VITE_APP_VERSION`
- `VITE_APP_GOOGLE_MAPS_API_KEY`

Current default assumptions:

- the app runs from `/`
- Google Maps is optional and the key may stay empty until map features are adopted into the app

## Routing And Base Path

Current template routing lives in:

- [`src/template/routes/index.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/routes/index.tsx)
- [`src/template/config.ts`](/Users/ahsan/Projects/Personal/admin-template/src/template/config.ts)
- [`vite.config.ts`](/Users/ahsan/Projects/Personal/admin-template/vite.config.ts)

If the app is deployed under a sub-path, update `VITE_APP_BASE_NAME` accordingly.

As routing is extracted from the template, update this document to point at the app-owned route tree under `src/`.

## Documentation Structure

- [`docs/agent-guide.md`](/Users/ahsan/Projects/Personal/admin-template/docs/agent-guide.md): primary implementation contract
- [`docs/ui-inventory.md`](/Users/ahsan/Projects/Personal/admin-template/docs/ui-inventory.md): template reuse map
- [`docs/setup.md`](/Users/ahsan/Projects/Personal/admin-template/docs/setup.md): setup and migration notes
- [`docs/task-brief-template.md`](/Users/ahsan/Projects/Personal/admin-template/docs/task-brief-template.md): template for future feature briefs

## Maintenance Notes

- Keep `docs/agent-guide.md` short and directive.
- Update `docs/ui-inventory.md` when template files move or when common extraction targets change.
- Update docs whenever ownership shifts from `src/template` to app-owned `src/` files.
- Remove references to template routes, menu items, and styles once the app no longer uses them.
