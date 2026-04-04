# UI Inventory

Use this file to find the best template implementation to copy from before building app-owned code.

Everything listed here is primarily reference material under [`src/template`](/Users/ahsan/Projects/Personal/admin-template/src/template). The normal workflow is to inspect these files, copy the relevant parts into `src/`, and adapt them for the product.

## Transition Entry Points

- current app handoff: [`src/App.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/App.tsx)
- current root entry: [`src/index.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/index.tsx)
- current template app root: [`src/template/App.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/App.tsx)
- current template style entry: [`src/template/index.scss`](/Users/ahsan/Projects/Personal/admin-template/src/template/index.scss)

Use these when you need to understand how the repo currently boots while the template still owns the shell.

## Template App Shell

- router setup: [`src/template/routes/index.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/routes/index.tsx)
- default app path: [`src/template/config.ts`](/Users/ahsan/Projects/Personal/admin-template/src/template/config.ts)
- dashboard shell: [`src/template/layout/Dashboard/index.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/layout/Dashboard/index.tsx)
- auth shell: [`src/template/layout/Auth/index.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/layout/Auth/index.tsx)
- header: [`src/template/layout/Dashboard/Header.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/layout/Dashboard/Header.tsx)
- footer: [`src/template/layout/Dashboard/Footer.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/layout/Dashboard/Footer.tsx)

Use these when the task affects shell behavior or when you need to extract a layout into app-owned code.

## Navigation And Breadcrumbs

- menu registry: [`src/template/menu-items/index.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/menu-items/index.tsx)
- navigation routes: [`src/template/routes/NavigationRoutes.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/routes/NavigationRoutes.tsx)
- component routes: [`src/template/routes/ComponentsRoutes.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/routes/ComponentsRoutes.tsx)
- form routes: [`src/template/routes/FormsRoutes.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/routes/FormsRoutes.tsx)
- table routes: [`src/template/routes/TablesRoutes.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/routes/TablesRoutes.tsx)
- page routes: [`src/template/routes/PagesRoutes.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/routes/PagesRoutes.tsx)
- chart and map routes: [`src/template/routes/ChartMapRoutes.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/routes/ChartMapRoutes.tsx)
- breadcrumbs component: [`src/template/components/Breadcrumbs.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/components/Breadcrumbs.tsx)

Use these as route and menu references. Product routes should eventually move into app-owned files under `src/`.

## Core Reusable Primitives

- card wrapper: [`src/template/components/MainCard.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/components/MainCard.tsx)
- route loading helper: [`src/template/components/Loadable.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/components/Loadable.tsx)
- loader: [`src/template/components/Loader.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/components/Loader.tsx)
- scroll helper: [`src/template/components/NavigationScroll.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/components/NavigationScroll.tsx)
- custom simplebar wrapper: [`src/template/components/third-party/SimpleBar.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/components/third-party/SimpleBar.tsx)

Use `MainCard` and the shell primitives as the first extraction targets for app-owned screens.

## Dashboard Patterns

- dashboard page: [`src/template/views/navigation/dashboard/Default.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/navigation/dashboard/Default.tsx)
- stat indicator card: [`src/template/components/cards/dashboard/StatIndicatorCard.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/components/cards/dashboard/StatIndicatorCard.tsx)
- social stats card: [`src/template/components/cards/dashboard/SocialStatsCard.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/components/cards/dashboard/SocialStatsCard.tsx)
- sales performance card: [`src/template/components/cards/dashboard/SalesPerformanceCard.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/components/cards/dashboard/SalesPerformanceCard.tsx)
- earnings chart section: [`src/template/sections/dashboard/EarningChart.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/dashboard/EarningChart.tsx)
- users map section: [`src/template/sections/dashboard/UsersMap.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/dashboard/UsersMap.tsx)
- rating card: [`src/template/sections/dashboard/default/RatingCard.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/dashboard/default/RatingCard.tsx)
- recent users card: [`src/template/sections/dashboard/RecentUsersCard.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/dashboard/RecentUsersCard.tsx)

Copy from these when building KPI, analytics, or summary-heavy product screens.

## Forms

- main form demo page: [`src/template/views/forms/form-element/FormBasic.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/forms/form-element/FormBasic.tsx)
- auth login form: [`src/template/sections/auth/AuthLogin.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/auth/AuthLogin.tsx)
- auth register form: [`src/template/sections/auth/AuthRegister.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/auth/AuthRegister.tsx)
- form controls: [`src/template/sections/components/form-element/FormControls.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/components/form-element/FormControls.tsx)
- input groups: [`src/template/sections/components/form-element/InputGroup.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/components/form-element/InputGroup.tsx)
- validation examples: [`src/template/sections/components/form-element/ValidationForm.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/components/form-element/ValidationForm.tsx)
- grid and layout examples: [`src/template/sections/components/form-element/FormGrid.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/components/form-element/FormGrid.tsx)
- checkbox and radio examples: [`src/template/sections/components/form-element/CheckRadio.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/components/form-element/CheckRadio.tsx)

Use these as form references, then extract only the fields, layout, and validation logic the app actually needs.

## Tables

- table demo page: [`src/template/views/table/bootstrap-table/BasicTable.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/table/bootstrap-table/BasicTable.tsx)
- basic table: [`src/template/sections/tables/bootstrap-table/basic-table/BasicTable.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/tables/bootstrap-table/basic-table/BasicTable.tsx)
- hover table: [`src/template/sections/tables/bootstrap-table/basic-table/HoverTable.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/tables/bootstrap-table/basic-table/HoverTable.tsx)
- striped table: [`src/template/sections/tables/bootstrap-table/basic-table/StripedTable.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/tables/bootstrap-table/basic-table/StripedTable.tsx)
- contextual table: [`src/template/sections/tables/bootstrap-table/basic-table/ContextualTable.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/tables/bootstrap-table/basic-table/ContextualTable.tsx)

Use these as starting points for operational list pages and lightweight data tables.

## Basic UI Examples

- buttons page: [`src/template/views/components/basic/Button.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/components/basic/Button.tsx)
- badges page: [`src/template/views/components/basic/Badges.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/components/basic/Badges.tsx)
- breadcrumb page: [`src/template/views/components/basic/Breadcrumb.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/components/basic/Breadcrumb.tsx)
- collapse page: [`src/template/views/components/basic/Collapse.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/components/basic/Collapse.tsx)
- tabs and pills page: [`src/template/views/components/basic/TabsPills.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/components/basic/TabsPills.tsx)
- typography page: [`src/template/views/components/basic/Typography.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/components/basic/Typography.tsx)

Use these when a feature needs a specific Bootstrap-style treatment already demonstrated in the template.

## Charts And Maps

- charts page: [`src/template/views/charts/ApexChart.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/charts/ApexChart.tsx)
- chart modules: [`src/template/sections/charts/apex-charts`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/charts/apex-charts)
- maps page: [`src/template/views/maps/GoogleMap.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/maps/GoogleMap.tsx)
- maps section: [`src/template/sections/maps/google-maps/BasicMap.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/maps/google-maps/BasicMap.tsx)

Use these only when the app actually needs charts or map behavior.

## Auth

- login page shell: [`src/template/views/auth/login/Login.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/auth/login/Login.tsx)
- register page shell: [`src/template/views/auth/register/Register.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/views/auth/register/Register.tsx)
- login form logic: [`src/template/sections/auth/AuthLogin.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/auth/AuthLogin.tsx)
- register form logic: [`src/template/sections/auth/AuthRegister.tsx`](/Users/ahsan/Projects/Personal/admin-template/src/template/sections/auth/AuthRegister.tsx)

Use these for centered public forms, auth shells, and validation flow references.

## Styling Sources

- template global entry: [`src/template/index.scss`](/Users/ahsan/Projects/Personal/admin-template/src/template/index.scss)
- template theme bundle: [`src/template/assets/scss/style.scss`](/Users/ahsan/Projects/Personal/admin-template/src/template/assets/scss/style.scss)
- template preset bundle: [`src/template/assets/scss/style-preset.scss`](/Users/ahsan/Projects/Personal/admin-template/src/template/assets/scss/style-preset.scss)
- color variables: [`src/template/assets/scss/settings/_color-variables.scss`](/Users/ahsan/Projects/Personal/admin-template/src/template/assets/scss/settings/_color-variables.scss)
- bootstrap variables: [`src/template/assets/scss/settings/_bootstrap-variables.scss`](/Users/ahsan/Projects/Personal/admin-template/src/template/assets/scss/settings/_bootstrap-variables.scss)
- theme variables: [`src/template/assets/scss/settings/_theme-variables.scss`](/Users/ahsan/Projects/Personal/admin-template/src/template/assets/scss/settings/_theme-variables.scss)

Inspect these only when extraction requires template styling. Prefer copying the smallest necessary style surface into app-owned code over keeping long-term dependency on the full template theme.
