# Starter App

React starter built from a third-party admin template, with the template now isolated under [`src/template`](/Users/ahsan/Projects/Personal/CoPerform/frontend/src/template).

The intended workflow is to turn this repo into a self-sufficient app and UI kit, not to keep building inside the template namespace. Treat `src/template` as a temporary reference source only. Shared components that survive feature work belong in [`src/ui`](/Users/ahsan/Projects/Personal/CoPerform/frontend/src/ui).

The intended workflow is:

- keep the original template code under `src/template`
- check `src/ui` first whenever a new feature needs a component
- reuse or extend an existing `src/ui` component when it already exists
- inspect `src/template` only when `src/ui` does not already provide what the feature needs
- extract the necessary template pieces, styles, and assets into app-owned folders before wiring the feature
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

- `src/App.tsx`: thin app entry that wires the app-owned providers and router
- `src/index.tsx`: root entry that imports app-owned global styles
- `src/ui`: app-owned reusable components extracted from the template and evolved locally
- `src/template`: namespaced template source library and reference area
- `docs/architecture-feature-spec.md`: required architecture and agentic feature-delivery standard for future work
- `docs/template-ui-library-index.md`: source-only index of the template UI surface for future reuse

## Working Rule

When a feature needs UI:

1. Check `src/ui` first and confirm whether the needed component already exists.
2. Reuse or extend the `src/ui` version if it exists.
3. Only if the component does not exist in `src/ui`, inspect the closest implementation under `src/template`.
4. Extract the relevant files and dependencies into `src/ui` or another app-owned feature folder under `src/`, with reusable building blocks landing in `src/ui`.
5. Port any required styles, icon assets, and supporting presentation files into app-owned files as part of the same extraction.
6. Remove demo content, template-specific wiring, and unused imports immediately.
7. Rename and reshape the extracted code around the actual product requirement.
8. Convert app-owned React modules to arrow-function components and hooks unless there is a clear technical reason not to.
9. Stop depending on the template version as soon as the app-owned version is in place.

## Extraction Policy

- New feature code should not introduce fresh imports from `src/template` when an app-owned version can live in `src/ui`.
- New feature code should not keep app-owned styling dependent on `src/template`; port the needed CSS, fonts, icons, or images during extraction.
- `src/template` is the fallback catalog and extraction source, not the place where product code should keep growing.
- If a template component is needed more than once or is clearly reusable, promote it into `src/ui` as part of the same feature.
- App-owned React modules should default to arrow-function declarations for components, hooks, and local helpers.
- Keep `docs/template-ui-library-index.md` aligned with the extraction process so future work can find the right source component quickly.

## Notes

- `VITE_APP_BASE_NAME` defaults to `/`
- `VITE_APP_GOOGLE_MAPS_API_KEY` can remain empty until map features are actually adopted
- local API calls should use `VITE_API_BASE_URL=/api`; Vite proxies `/api/*` to `VITE_API_PROXY_TARGET` during development to avoid browser CORS issues between `localhost:3000` and `localhost:8081`
- future feature work should follow `docs/architecture-feature-spec.md` in addition to the template extraction rules in this README
- update the docs whenever routing, styling, assets, or shared components move out of `src/template` and into `src/ui` or other app-owned folders
