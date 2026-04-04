# Starter App

Lean React frontend starter built from a third-party admin template. The reusable layouts, cards, forms, tables, charts, auth pages, and navigation building blocks remain in place, while template marketing assets and extra tooling have been removed.

## Scripts

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run build
npm run lint
npm run typecheck
```

## Structure

- `src/components`: shared UI primitives
- `src/layout`: dashboard and auth layouts
- `src/views`: page-level screens and demo pages you can repurpose
- `src/sections`: lower-level example sections used by pages
- `src/menu-items`: sidebar navigation config
- `src/routes`: app route definitions

## Notes

- `VITE_APP_BASE_NAME` defaults to `/`
- `VITE_APP_GOOGLE_MAPS_API_KEY` is empty by default; set it only if you use the Google Maps page
- Footer branding and page metadata use neutral starter values and should be customized for your app
