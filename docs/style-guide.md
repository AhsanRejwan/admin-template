# Style Guide

## UI Identity

This template is a Bootstrap-based admin UI with a dark navigation rail, a light content canvas, compact spacing, soft card shadows, and strong cyan primary accents. It is intentionally dashboard-oriented rather than marketing-oriented.

Primary visual references:

- [`docs/screenshots/dashboard-desktop.png`](/home/ahsan/Projects/Personal/admin-template/docs/screenshots/dashboard-desktop.png)
- [`docs/screenshots/dashboard-mobile.png`](/home/ahsan/Projects/Personal/admin-template/docs/screenshots/dashboard-mobile.png)
- [`docs/screenshots/forms-page.png`](/home/ahsan/Projects/Personal/admin-template/docs/screenshots/forms-page.png)
- [`docs/screenshots/login-page.png`](/home/ahsan/Projects/Personal/admin-template/docs/screenshots/login-page.png)

Core traits:

- Dark, high-contrast sidebar for persistent navigation
- Light content area with white cards on a pale neutral background
- Open Sans as the primary typeface
- Cyan-blue primary accent with teal and lavender gradients for emphasis
- Rounded but not overly soft surfaces
- Dense information layout using cards, grids, badges, tables, and inline status indicators

## Typography

- Font family: `Open Sans`
- Weights loaded: `300`, `400`, `500`, `600`
- Heading tone: medium to semibold, compact vertical rhythm
- Body copy: muted gray, optimized for dashboard readability rather than editorial prose

Usage guidance:

- Use `h5` for card titles and section titles unless the page clearly needs stronger hierarchy
- Keep body copy short and muted inside cards
- Prefer uppercase or small supporting labels for KPIs and metadata

## Color System

Primary palette is defined in [`src/assets/scss/settings/_color-variables.scss`](/home/ahsan/Projects/Personal/admin-template/src/assets/scss/settings/_color-variables.scss).

Main colors:

- Primary blue: `#04a9f5`
- Success green: `#1de9b6`
- Purple: `#a389d4`
- Danger red: `#f44236`
- Warning yellow: `#f4c22b`
- Info cyan: `#3ebfea`
- Sidebar background: `#3f4d67`
- Sidebar text: `#a9b7d0`
- Neutral text: `#5b6b79` to `#1d2630`

Brand gradients:

- `brand-color-1`: `linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%)`
- `brand-color-2`: `linear-gradient(-135deg, #899fd4 0%, #a389d4 100%)`
- `brand-color-3`: `linear-gradient(207.92deg, #0398f2 11.42%, #38b9e7 106.55%)`

Theme variables are defined in [`src/assets/scss/settings/_theme-variables.scss`](/home/ahsan/Projects/Personal/admin-template/src/assets/scss/settings/_theme-variables.scss).

Important CSS custom properties:

- `--pc-sidebar-background`
- `--pc-sidebar-color`
- `--pc-sidebar-active-color`
- `--pc-header-background`
- `--pc-card-box-shadow`

## Surfaces

The default surface is a white Bootstrap card rendered through [`src/components/MainCard.jsx`](/home/ahsan/Projects/Personal/admin-template/src/components/MainCard.tsx).

Surface rules:

- Default content should live inside `MainCard`
- Use the card header for `title`, `subheader`, and `secondary` actions
- Use `bodyClassName` to tighten padding for dense widgets or tables
- Use full-bleed card bodies only when the child component manages its own spacing
- Use one highlighted card per view at most; the dashboard’s earnings card is the reference for accent-heavy treatment

## Shadows, Borders, Radius

- Card shadow: `0 1px 20px 0 rgba(69, 90, 100, 0.08)`
- Rounded corners come primarily from Bootstrap defaults
- The template prefers subtle borders and stronger separation through spacing and shadow

Design implication:

- Avoid large blurred shadows or glossy effects
- Avoid very rounded consumer-style UI
- Prefer restrained elevation and clear section separation

## Spacing

The spacing scale follows Bootstrap defaults in [`src/assets/scss/settings/_bootstrap-variables.scss`](/home/ahsan/Projects/Personal/admin-template/src/assets/scss/settings/_bootstrap-variables.scss):

- `0`: `0`
- `1`: `0.25rem`
- `2`: `0.5rem`
- `3`: `1rem`
- `4`: `1.5rem`
- `5`: `3rem`

Usage guidance:

- Use `mb-3` and `mb-4` as the standard vertical rhythm inside forms and cards
- Use grid gutters and `Row`/`Col` first; avoid custom spacing wrappers unless the layout demands it
- Keep dashboards visually dense but not cramped

## Layout System

Core layout dimensions:

- Header height: `74px`
- Sidebar width: `264px`
- Collapsed sidebar width: `80px`
- Expanded-on-hover collapsed width: `300px`

Shell structure from [`src/layout/Dashboard/index.jsx`](/home/ahsan/Projects/Personal/admin-template/src/layout/Dashboard/index.tsx):

- `Drawer`
- `Header`
- `.pc-container`
- `.pc-content`
- `Breadcrumbs`
- `NavigationScroll`
- routed page content
- `Footer`

Layout guidance:

- New authenticated pages should usually use the dashboard shell
- Keep page content inside the `.pc-content` flow so breadcrumbs and spacing remain consistent
- Prefer `Row`/`Col` responsive layout instead of custom flex shells for whole pages

## Navigation

Sidebar navigation is data-driven through [`src/menu-items/index.jsx`](/home/ahsan/Projects/Personal/admin-template/src/menu-items/index.tsx) and rendered through the drawer components in [`src/layout/Dashboard/Drawer`](/home/ahsan/Projects/Personal/admin-template/src/layout/Dashboard/Drawer).

Navigation conventions:

- Top-level groups are captions
- Groups contain `collapse` or `item` nodes
- Icons are left-aligned and lightweight
- Active state is handled by route matching
- Breadcrumb labels are derived from menu item titles

If a new page should appear in breadcrumbs or sidebar navigation, it must be added to `src/menu-items/*` in addition to the router.

## Icons

The template mixes icon fonts:

- Phosphor classes: `ph ph-*`
- Tabler classes: `ti ti-*`

Usage guidance:

- Use one icon family consistently inside a single new component
- Use Phosphor for shell/navigation/system icons
- Use Tabler when matching existing demo widgets that already use `ti`

## Forms

Form styling is React-Bootstrap first, with validation handled by `react-hook-form` in auth screens and standard Bootstrap validation states in examples.

Reference patterns:

- Inputs, selects, textareas, checkboxes, radios, switches, datalists, and range controls
- `InputGroup` patterns for inline actions or helper affordances
- Validation feedback beneath the control
- Grid-aligned forms for multi-column content

Rules:

- Use React-Bootstrap `Form.*` primitives
- Use `react-hook-form` for real forms
- Place actions at the bottom right or centered depending on the page type
- Use `Form.Control.Feedback` for inline errors

## Tables

Tables are Bootstrap tables wrapped in cards. The template shows:

- basic
- hover
- dark
- striped
- contextual row backgrounds

Table guidance:

- Use a `MainCard` wrapper
- Keep headers concise
- Use badges for status
- Use avatars or icons in the first column when listing users, projects, or entities

## Charts And Data Widgets

Charts use ApexCharts and are always embedded inside cards. The visual style is simple:

- minimal chart chrome
- hidden or muted grid lines
- strong accent color
- KPI copy adjacent to the chart

Avoid:

- noisy legends
- excessive chart controls
- high-density rainbow palettes

## Responsive Behavior

Responsive behavior is intentionally conservative:

- Sidebar becomes overlay-driven on smaller screens
- Pages remain grid-based using Bootstrap breakpoints
- Tables rely on `responsive`
- Scroll regions use `SimpleBar` on desktop and native overflow on mobile

Reference screenshot: `docs/screenshots/dashboard-mobile.png`

## Visual Rules For Future Features

When adding product features:

- Use `MainCard` as the default container
- Preserve the dark sidebar and light workspace contrast
- Use primary blue sparingly as the action color
- Use gradient badges or progress bars only for emphasis, not for every metric
- Prefer concise copy, metadata rows, and utility alignment over large decorative blocks
- Match Bootstrap spacing and typography utilities before introducing custom CSS
