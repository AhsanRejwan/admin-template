# Main Layout Implementation Plan

## Objective

Create one app-owned main layout that both the main app and the superuser app can use, while strictly following:

- [`docs/template-ui-library-index.md`](/Users/ahsan/Projects/Personal/CoPerform/frontend/docs/template-ui-library-index.md)
- [`docs/architecture-feature-spec.md`](/Users/ahsan/Projects/Personal/CoPerform/frontend/docs/architecture-feature-spec.md)

The target layout should:

- reuse only the minimum structural ideas from the template
- include the sidebar
- keep a topbar container but no topbar elements
- avoid bringing in unrelated template components or runtime wiring
- allow both `/` and `/superuser` to share the same base shell

## Architecture Decision

The shared shell should be implemented as an app-owned layout in `src/ui/layouts`, not by importing the template dashboard layout directly.

This follows the required workflow:

1. check `src/ui` first
2. extract only the minimum needed from `src/template`
3. place reusable app-owned UI in `src/ui`
4. keep feature pages thin and route-oriented

This means the template remains a donor library only. Product routes should not depend on `src/template/layout`, `src/template/menu-items`, or template state helpers.

## Recommended Solution

Create a reusable `MainLayout` that renders:

- a sidebar
- an empty topbar container
- a main content region with `Outlet`

The sidebar should be intentionally minimal:

- no template menu tree
- no nested navigation
- no demo data
- no template logo handling
- one link only, pointing to the current section's page

The layout should accept minimal configuration so the app route branch and the superuser route branch can each supply a single sidebar item without duplicating the shell.

## Engineering Approach

### 1. Extract The Shell Into App-Owned UI

Add a new layout component under `src/ui/layouts`.

Recommended file:

- `src/ui/layouts/MainLayout.tsx`

Responsibilities:

- render the shared page shell
- render the sidebar
- render an empty topbar wrapper for future use
- render child routes through `Outlet`

Recommended prop shape:

- `sidebarItems`
- each item can hold `label` and `to`

Keep the API small. Do not introduce speculative abstractions beyond the active requirement.

### 2. Keep Sidebar Logic Minimal

The sidebar can either live inside `MainLayout.tsx` or in one directly related helper component if separation improves clarity.

Optional helper:

- `src/ui/layouts/MainLayoutSidebar.tsx`

Responsibilities:

- render the sidebar container
- render exactly one `NavLink`
- reflect active state through router-aware styling

Do not import:

- `src/template/layout/Dashboard/Drawer/DrawerContent/index.tsx`
- `src/template/layout/Dashboard/Drawer/DrawerContent/NavGroup.tsx`
- `src/template/layout/Dashboard/Drawer/DrawerContent/NavCollapse.tsx`
- `src/template/layout/Dashboard/Drawer/DrawerContent/NavItem.tsx`
- `src/template/menu-items/*`

### 3. Port Only Required Styles

Create an app-owned stylesheet for the layout.

Recommended file:

- `src/assets/styles/MainLayout.css`

Use the template only as a visual and structural reference. Extract only the minimum necessary layout behavior from:

- `src/template/layout/Dashboard/index.tsx`
- `src/template/assets/scss/themes/layouts/_pc-common.scss`
- `src/template/assets/scss/themes/layouts/_pc-sidebar.scss`
- `src/template/assets/scss/themes/layouts/_pc-header.scss`

Port only the rules needed for:

- sidebar width and positioning
- topbar container positioning
- main content spacing
- responsive stacking or collapsing behavior
- active sidebar link state

Do not import:

- `src/template/index.scss`
- template icon font bundles
- `simplebar-react` styles unless they become strictly necessary

### 4. Introduce A Real App Home Page

The main app route currently renders a raw `div`. Replace it with a thin page module.

Recommended file:

- `src/pages/app/AppHomePage.tsx`

Responsibilities:

- act as the route-facing page entrypoint
- render current placeholder content only
- stay free of layout orchestration

The superuser home page should remain thin as well:

- `src/pages/superuser/SuperuserHomePage.tsx`

Neither page should own sidebar or shell logic.

### 5. Wrap Both Route Branches With The Shared Layout

Update centralized routing in:

- `src/routes/Index.tsx`

Recommended route structure:

- `/`
  - uses `MainLayout`
  - renders `AppHomePage`
- `/superuser/auth`
  - remains under `AuthLayout`
  - renders `SuperuserAuthPage`
- `/superuser`
  - stays behind `SuperuserProtectedRoute`
  - uses the same `MainLayout`
  - renders `SuperuserHomePage`

The layout instance for each branch can receive a different single sidebar item:

- app branch: link to `/`
- superuser branch: link to `/superuser`

This preserves centralized route ownership and avoids duplicating shell code.

## Files To Create

- `src/ui/layouts/MainLayout.tsx`
- `src/assets/styles/MainLayout.css`
- `src/pages/app/AppHomePage.tsx`

Optional:

- `src/ui/layouts/MainLayoutSidebar.tsx`

## Files To Update

- `src/routes/Index.tsx`

Possibly:

- `src/pages/superuser/SuperuserHomePage.tsx`
- `src/constants/Routes.ts`

## Files Explicitly Not To Reuse Directly In Product Code

- `src/template/layout/Dashboard/index.tsx`
- `src/template/layout/Dashboard/Header.tsx`
- `src/template/layout/Dashboard/Footer.tsx`
- `src/template/layout/Dashboard/Drawer/index.tsx`
- `src/template/layout/Dashboard/Drawer/vertical/VerticalDrawer.tsx`
- `src/template/layout/Dashboard/Drawer/vertical/VerticalDrawerContent.tsx`
- `src/template/layout/Dashboard/Drawer/common/DrawerHeader.tsx`
- `src/template/layout/Dashboard/Drawer/common/DrawerOverlay.tsx`
- `src/template/layout/Dashboard/Drawer/common/useDrawerLogic.ts`
- `src/template/api/menu.ts`
- `src/template/menu-items/*`

These files either contain demo content, unnecessary layout features, or template-specific runtime coupling that does not fit the current requirement.

## Why This Fits The Architecture Rules

### SOLID

- layout owns shell rendering only
- pages remain thin
- sidebar rendering is scoped to layout concerns

### DRY

- one shared layout for both app sections
- no duplicated shell markup between app and superuser routes

### KISS

- one simple sidebar item per branch
- empty topbar shell for future extension
- no menu state machine or drawer framework unless needed

### YAGNI

- no footer
- no breadcrumbs
- no template notification/profile/search controls
- no menu provider or extra context
- no multi-level navigation system before it is needed

## Validation Checklist

After implementation, verify:

1. `npm run typecheck`
2. `npm run build`
3. `npm run lint`

Also verify manually:

- `/` renders inside the shared layout
- `/superuser/auth` does not render the shared layout
- authenticated `/superuser` renders inside the shared layout
- sidebar shows one current-page link only
- topbar container exists but has no elements
- no new product code imports runtime layout pieces from `src/template`

## Expected Outcome

After this change, the codebase will have a single reusable app-owned shell that both the main app and the superuser area can share. Future pages can adopt the same layout and add or remove layout pieces incrementally without reintroducing template-specific dependencies.
