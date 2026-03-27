# Project Bootstrap

## Current Stack

- React `19.2.0`
- Vite `7.1.12`
- Bootstrap `5.3.8`
- React-Bootstrap `2.10.10`
- Sass
- React Router `7.9.5`
- ApexCharts
- Google Maps React bindings
- SWR
- React Hook Form

Defined in [`package.json`](/home/ahsan/Projects/Personal/admin-template/package.json).

## Local Setup

Install:

```bash
npm install
```

Run:

```bash
npm run start
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Node Version

This repo currently runs on Node `20.16.0` in the local environment, but Vite 7 reports a requirement of `20.19+` or `22.12+`.

Recommended action:

- use Node `22.12.0` or newer
- use the included `.nvmrc` to standardize local setup

## Environment

The current `.env` includes template-specific values and a Google Maps API key. That should not be treated as the long-term application configuration.

Important variables:

- `VITE_APP_BASE_NAME`
- `VITE_APP_VERSION`
- `VITE_APP_GOOGLE_MAPS_API_KEY`

Use the new `.env.example` as the safe starting point for your own app setup.

## Base Path Behavior

The template is configured to run under:

```text
/demos/admin-templates/datta-able/react/free
```

This is set through `VITE_APP_BASE_NAME` and consumed in [`vite.config.mjs`](/home/ahsan/Projects/Personal/admin-template/vite.config.mjs) and [`src/routes/index.jsx`](/home/ahsan/Projects/Personal/admin-template/src/routes/index.jsx).

If you are building your own application locally at the root path, set:

```env
VITE_APP_BASE_NAME=/
```

## Bootstrap / Initialization Changes Added

- `.gitignore` now ignores plain `.env` files
- `.env.example` provides a sanitized starting configuration
- `.nvmrc` documents a compatible Node target
- `docs/` provides agent-facing design and implementation context

## Recommended First Cleanup For Your Own App

1. Replace brand strings in `src/branding.json`
2. Decide whether the app should run from `/` or a sub-path and update `VITE_APP_BASE_NAME`
3. Replace the Google Maps key with your own restricted key or remove map features
4. Replace dashboard demo content with your product KPIs
5. Remove menu groups and demo routes you do not plan to use
6. Keep `MainCard`, the shell layout, and the SCSS token system as the base UI architecture

## Safe Extension Points

Best places to extend:

- `src/views` for route-level pages
- `src/sections` for page sections
- `src/components` for truly reusable shared components
- `src/menu-items` for sidebar and breadcrumb metadata
- `src/assets/scss` for global theme adjustments

## Theme Customization Order

When changing branding, follow this order:

1. update `src/branding.json`
2. update base path and environment
3. adjust SCSS variables in `src/assets/scss/settings`
4. refresh screenshots in `docs/screenshots`
5. remove unused demo routes and menu items

## Verification Notes

The template build completes successfully, but Vite prints a Node version warning in the current environment. Treat that as a real compatibility concern and upgrade Node before ongoing development.

Runtime notes captured during documentation:

- the dashboard map emits browser console errors from `jsvectormap` while rendering
- the auth pages emit browser autocomplete warnings for form inputs

These do not block initial use of the template, but they should be reviewed during cleanup if you want a quieter baseline.
