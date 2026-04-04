# Agent Playbook

## Goal

Future agents should use this template as a constrained design system, not as loose inspiration. New work should look native to Datta Able unless the user explicitly asks for a redesign.

## Non-Negotiable Rules

- Keep the dashboard shell intact unless the feature is intentionally outside authenticated admin space
- Use `MainCard` for new surfaces before inventing custom wrappers
- Use Bootstrap grid and React-Bootstrap primitives before custom layout code
- Preserve the dark sidebar and light workspace visual contrast
- Match existing spacing, font sizing, and muted text treatment
- Reuse existing icon families and utility classes
- Keep components dense, practical, and information-oriented

## Preferred Composition Order

When building a new page:

1. Add the route
2. Add the menu entry if it belongs in sidebar navigation
3. Scaffold the page with `Row`, `Col`, and `MainCard`
4. Use existing form, badge, button, or table patterns
5. Add only the minimum custom SCSS needed

## How To Build Common Feature Types

### CRUD List Page

Use:

- page title via breadcrumb/menu wiring
- one or more `MainCard` sections
- Bootstrap responsive table
- badges for status
- buttons for row actions
- optional filter form above the table

Avoid:

- custom table shells when `Table responsive` is sufficient
- large empty hero banners

### CRUD Create/Edit Form

Use:

- `MainCard` wrapper
- `Form`, `Row`, `Col`, `InputGroup`
- `react-hook-form` for validation and submission
- inline feedback using `Form.Control.Feedback`

Pattern sources:

- [`src/sections/auth/AuthLogin.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/auth/AuthLogin.tsx)
- [`src/sections/auth/AuthRegister.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/auth/AuthRegister.tsx)
- [`src/views/forms/form-element/FormBasic.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/forms/form-element/FormBasic.tsx)

### Dashboard Or Analytics Screen

Use:

- `MainCard`
- KPI cards
- progress bars
- ApexCharts modules
- limited accent color usage

Pattern source:

- [`src/views/navigation/dashboard/Default.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/navigation/dashboard/Default.tsx)

### Detail Page

Use:

- top summary card
- 2-column information layout where useful
- smaller support cards below
- badge-driven metadata rows

### Auth Or Public Utility Screen

Use the auth shell only if the page is conceptually similar to login/register. Otherwise keep the dashboard shell and build the feature as part of the application.

## Styling Rules

- Start with utility classes before adding SCSS
- If a new variant is needed, add it near the existing theme/component SCSS structure
- Avoid introducing a separate design language
- Keep color usage mostly within blue, teal, neutral gray, red, and lavender ranges already present
- Use gradients only for emphasized progress or promotional stats

## Content Rules

- Labels should be short and operational
- Status should be communicated by badge, icon, color, or all three
- Supporting copy should be muted and compact
- Prefer table rows, cards, and inline metrics over large paragraphs

## Navigation And Breadcrumb Rules

Breadcrumbs are derived from menu definitions. If a page must appear with the correct breadcrumb chain:

1. Add it to the relevant route file in `src/routes`
2. Add it to the relevant menu group in `src/menu-items`

Do not hardcode page headers separately from navigation metadata unless there is a good reason.

## When To Create A New Reusable Component

Create a new reusable component when:

- the pattern appears on 2 or more pages
- the component has a clear responsibility
- it can be composed with existing `MainCard` and Bootstrap primitives

Do not create a reusable component just to wrap a single page section with trivial markup.

## Prompt Template For Future Agents

Use this when starting new feature work:

```text
Read docs/style-guide.md, docs/component-library.md, and docs/agent-playbook.md first.
Build the feature so it looks native to the Datta Able template already in this repo.
Prefer MainCard, React-Bootstrap primitives, the existing dashboard shell, and the current spacing/color/icon patterns.
Only add custom styling when existing utilities and theme classes are not enough.
If the page belongs in the app navigation, update both the route and menu config so breadcrumbs work correctly.
```

## First Customization Targets

When converting this template into your own product, replace these first:

- branding content in [`src/branding.json`](/home/ahsan/Projects/Personal/admin-template/src/branding.json)
- dashboard demo metrics and dummy names
- auth copy and destination actions
- sample page and demo-heavy menu groups you do not need
- Google Maps example and placeholder API key
