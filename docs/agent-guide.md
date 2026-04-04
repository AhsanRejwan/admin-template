# Agent Guide

This is the primary implementation guide for future work in this repository.

Read this file first. Pull in deeper references only when the task needs them.

## Purpose

This repo is not meant to grow by editing the admin template in place forever.

The template now lives under [`src/template`](/Users/ahsan/Projects/Personal/admin-template/src/template) as a namespaced source library. New product code should be built outside that namespace by selectively copying the pieces the app actually uses.

The intended end state is:

- `src/template` remains the untouched or lightly adjusted reference area while product work is in progress
- app-specific code is implemented in the real app structure under `src/`
- when the product has fully replaced the borrowed template pieces, `src/template` can be deleted from the cloned repo

That keeps the final app lean and prevents template baggage from becoming permanent architecture.

## Core Workflow

When implementing a new screen, flow, or reusable module:

1. Read this file.
2. Review the task brief, design, API contract, or architecture notes.
3. Inspect [`docs/ui-inventory.md`](/Users/ahsan/Projects/Personal/admin-template/docs/ui-inventory.md) to find the closest template implementation.
4. Inspect the relevant source inside [`src/template`](/Users/ahsan/Projects/Personal/admin-template/src/template).
5. Copy only the required code and dependencies into the app’s real structure under `src/`.
6. Rename, simplify, and adapt that copied code to the product requirement.
7. Wire the product version into the app.
8. Leave the template version available as reference unless the task explicitly includes cleanup.

Do not treat `src/template` as the permanent home of new business features.

## Namespace Rule

The default assumption in this repo is:

- template code stays namespaced under `src/template`
- new app code lives outside that namespace
- when a template module is needed, copy it out with the minimum supporting pieces required to make it work

Typical supporting pieces include:

- local child components
- route definitions
- menu metadata
- section modules
- styles
- images or icons
- helper utilities

Copy the smallest working slice. Avoid dragging whole template areas into the app when only one card, form, or page pattern is needed.

## What To Change First

For most feature work:

1. Find the closest example in [`src/template/views`](/Users/ahsan/Projects/Personal/admin-template/src/template/views), [`src/template/sections`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections), [`src/template/components`](/Users/ahsan/Projects/Personal/admin-template/src/template/components), or [`src/template/layout`](/Users/ahsan/Projects/Personal/admin-template/src/template/layout).
2. Copy the relevant files into the target app location under `src/`.
3. Replace template-only text, dummy data, icons, and layout assumptions.
4. Remove unused imports, props, helpers, and styles immediately.
5. Connect the product version to the actual app route tree and navigation only if the feature needs it.

## Architecture Intent

Current entrypoints intentionally keep the app thin:

- [`src/App.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/App.tsx) delegates to the template app for now
- [`src/index.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/index.tsx) imports template styles for now

This is transitional. As product code replaces template areas:

- move routing ownership out of the template namespace
- move styling ownership out of the template namespace
- move shared app primitives into stable non-template locations
- delete template-only files once nothing depends on them

## Reuse Strategy

Prefer copying from the template when:

- the template already solves most of the UI problem
- reuse will save time without importing unnecessary complexity
- the copied code can be simplified into a clean app-owned module

Build from scratch when:

- the template example is more work to untangle than to recreate
- the product interaction model is materially different
- copying would bring too much dead styling or route structure with it

## Rules For Copied Code

When moving code from `src/template` into app-owned locations:

- keep only the parts the new app actually uses
- rename vague template names to product-relevant names
- remove demo content and placeholder data
- update imports so the new module does not depend on template paths unless that dependency is intentional and temporary
- if a copied module still depends on template code, document that dependency in the task or PR

The goal is extraction, not duplication without cleanup.

## Styling Guidance

Before copying SCSS, confirm whether the target screen can use existing Bootstrap or already-copied app styling.

If styling must come from the template:

- copy only the necessary partials or local styles
- avoid making the app depend on the full template theme unless that is still an intentional temporary state
- prefer moving toward app-owned style entrypoints over time

## Navigation And Routing

Treat template routing and menu configuration as reference implementations.

If a feature becomes part of the real app:

- create or update app-owned routes under `src/`
- add app-owned navigation metadata under `src/` if needed
- only mirror template route structure when it still makes sense for the product

Do not keep product navigation permanently coupled to `src/template/routes` or `src/template/menu-items`.

## What To Read Next

- [`docs/ui-inventory.md`](/Users/ahsan/Projects/Personal/admin-template/docs/ui-inventory.md): map of template code worth copying from
- [`docs/setup.md`](/Users/ahsan/Projects/Personal/admin-template/docs/setup.md): setup, runtime, and migration notes
- [`docs/task-brief-template.md`](/Users/ahsan/Projects/Personal/admin-template/docs/task-brief-template.md): handoff structure for future tasks

## Prompt Snippet For Future Agents

```text
Read docs/agent-guide.md first. Treat src/template as the namespaced template reference area, not the permanent home for new feature work. Inspect docs/ui-inventory.md, copy only the relevant template code into the real app structure under src/, and remove unused template baggage as you implement.
```
