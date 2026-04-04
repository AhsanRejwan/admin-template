# Starter App

React starter built from a third-party admin template, with the template now isolated under [`src/template`](/Users/ahsan/Projects/Personal/admin-template/src/template).

The intended workflow is not to keep building the product inside the template namespace. Instead:

- keep the original template code under `src/template`
- inspect and copy only the pieces a feature needs
- move those pieces into the real app structure under `src/`
- delete `src/template` once the app no longer depends on it

This keeps the final codebase lean and avoids shipping permanent template baggage.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Current Structure

- `src/App.tsx`: thin app entry that currently delegates to the template app
- `src/index.tsx`: root entry that currently imports template styles
- `src/template`: namespaced template source library and reference area
- `docs/agent-guide.md`: coding workflow and extraction rules
- `docs/ui-inventory.md`: map of template files worth copying from

## Working Rule

When a template page, component, layout, route, or style is needed in the new app:

1. Inspect the closest implementation under `src/template`.
2. Copy the relevant files and dependencies into app-owned locations under `src/`.
3. Remove demo content and unused imports immediately.
4. Rename and reshape the copied code around the actual product requirement.
5. Stop depending on the template version as soon as the app-owned version is in place.

## Notes

- `VITE_APP_BASE_NAME` defaults to `/`
- `VITE_APP_GOOGLE_MAPS_API_KEY` can remain empty until map features are actually adopted
- update the docs whenever routing, styling, or shared components move out of `src/template`
