# Template UI Library Index

This file indexes the live UI surface under `src/template` so future agents can treat the template as a UI library and nothing more.

## Recommendation

Use a repo-local documentation index, not a Codex skill, for this job.

- The useful asset here is a source-of-truth map of concrete UI files in this repo.
- A skill would still need this inventory underneath it.
- The UI surface is local to this codebase, so the inventory should live beside the code.

## Scope

Use this index for:

- reusable UI primitives
- dashboard cards and visual sections
- form, table, chart, map, and auth UI pieces
- the dashboard shell, sidebar, and header/footer chrome when a feature needs template-like layout

Do not treat these as the UI library surface:

- `src/template/routes/*`
- `src/template/menu-items/*`
- `src/template/api/menu.ts`
- demo-only arrays, placeholder text, sample metrics, sample users, and sample notifications
- the app-level handoff in `src/App.tsx` and `src/index.tsx`

`views/*` are assembly maps. They are useful for seeing how the smaller UI pieces are composed, but they are not the reusable surface by default.

## Style Foundation

Bring these along when a copied UI component depends on template styling or icons:

- style entry: [`src/template/index.scss`](../src/template/index.scss)
- theme bundle: [`src/template/assets/scss/style.scss`](../src/template/assets/scss/style.scss)
- preset bundle: [`src/template/assets/scss/style-preset.scss`](../src/template/assets/scss/style-preset.scss)
- color variables: [`src/template/assets/scss/settings/_color-variables.scss`](../src/template/assets/scss/settings/_color-variables.scss)
- bootstrap overrides: [`src/template/assets/scss/settings/_bootstrap-variables.scss`](../src/template/assets/scss/settings/_bootstrap-variables.scss)
- theme variables: [`src/template/assets/scss/settings/_theme-variables.scss`](../src/template/assets/scss/settings/_theme-variables.scss)
- local overrides: [`src/template/global.scss`](../src/template/global.scss)

Important style facts:

- the template relies heavily on `react-bootstrap`
- icon classes come from the Phosphor and Tabler font imports inside [`src/template/index.scss`](../src/template/index.scss)
- `simplebar-react` and `jsvectormap` CSS are also imported there
- many cards assume template-specific classes from the SCSS partials, especially button, card, table, dropdown, widget, sidebar, header, footer, and authentication styles

## Inventory Summary

Live UI-related source under `src/template` is organized as:

- `10` shared components in `src/template/components`
- `16` layout modules in `src/template/layout`
- `78` section-level UI modules in `src/template/sections`
- `13` demo assembly pages in `src/template/views`

## Core Shared Primitives

These are the main reusable building blocks that appear across the template:

- card wrapper: [`src/template/components/MainCard.tsx`](../src/template/components/MainCard.tsx)
- breadcrumb renderer: [`src/template/components/Breadcrumbs.tsx`](../src/template/components/Breadcrumbs.tsx)
- reference header used on demo pages: [`src/template/components/ReferenceHeader.tsx`](../src/template/components/ReferenceHeader.tsx)
- lazy route wrapper: [`src/template/components/Loadable.tsx`](../src/template/components/Loadable.tsx)
- loading bar: [`src/template/components/Loader.tsx`](../src/template/components/Loader.tsx)
- scroll-to-top wrapper: [`src/template/components/NavigationScroll.tsx`](../src/template/components/NavigationScroll.tsx)
- browser/mobile scroll wrapper: [`src/template/components/third-party/SimpleBar.tsx`](../src/template/components/third-party/SimpleBar.tsx)

Dashboard-specific shared cards:

- [`src/template/components/cards/dashboard/SalesPerformanceCard.tsx`](../src/template/components/cards/dashboard/SalesPerformanceCard.tsx)
- [`src/template/components/cards/dashboard/SocialStatsCard.tsx`](../src/template/components/cards/dashboard/SocialStatsCard.tsx)
- [`src/template/components/cards/dashboard/StatIndicatorCard.tsx`](../src/template/components/cards/dashboard/StatIndicatorCard.tsx)

## Layout, Shell, And Sidebar

Index these when a feature needs template chrome in addition to the component itself:

- dashboard shell: [`src/template/layout/Dashboard/index.tsx`](../src/template/layout/Dashboard/index.tsx)
- header: [`src/template/layout/Dashboard/Header.tsx`](../src/template/layout/Dashboard/Header.tsx)
- footer: [`src/template/layout/Dashboard/Footer.tsx`](../src/template/layout/Dashboard/Footer.tsx)
- auth shell: [`src/template/layout/Auth/index.tsx`](../src/template/layout/Auth/index.tsx)
- drawer entry: [`src/template/layout/Dashboard/Drawer/index.tsx`](../src/template/layout/Dashboard/Drawer/index.tsx)
- vertical drawer: [`src/template/layout/Dashboard/Drawer/vertical/VerticalDrawer.tsx`](../src/template/layout/Dashboard/Drawer/vertical/VerticalDrawer.tsx)
- drawer content wrapper: [`src/template/layout/Dashboard/Drawer/vertical/VerticalDrawerContent.tsx`](../src/template/layout/Dashboard/Drawer/vertical/VerticalDrawerContent.tsx)
- drawer header: [`src/template/layout/Dashboard/Drawer/common/DrawerHeader.tsx`](../src/template/layout/Dashboard/Drawer/common/DrawerHeader.tsx)
- drawer overlay: [`src/template/layout/Dashboard/Drawer/common/DrawerOverlay.tsx`](../src/template/layout/Dashboard/Drawer/common/DrawerOverlay.tsx)
- drawer logic hook: [`src/template/layout/Dashboard/Drawer/common/useDrawerLogic.ts`](../src/template/layout/Dashboard/Drawer/common/useDrawerLogic.ts)
- navigation tree root: [`src/template/layout/Dashboard/Drawer/DrawerContent/index.tsx`](../src/template/layout/Dashboard/Drawer/DrawerContent/index.tsx)
- navigation group: [`src/template/layout/Dashboard/Drawer/DrawerContent/NavGroup.tsx`](../src/template/layout/Dashboard/Drawer/DrawerContent/NavGroup.tsx)
- navigation collapse: [`src/template/layout/Dashboard/Drawer/DrawerContent/NavCollapse.tsx`](../src/template/layout/Dashboard/Drawer/DrawerContent/NavCollapse.tsx)
- navigation item: [`src/template/layout/Dashboard/Drawer/DrawerContent/NavItem.tsx`](../src/template/layout/Dashboard/Drawer/DrawerContent/NavItem.tsx)

Layout reuse notes:

- `Header.tsx` and the sidebar nav include demo notifications, demo profile actions, and menu wiring
- `Breadcrumbs.tsx` depends on template menu metadata, so reuse it only if you also want that breadcrumb model
- `MainCard.tsx` is the most important layout-adjacent primitive; many other UI pieces are built on top of it

## Demo Assembly Pages

Use these to locate the closest composed example quickly:

- dashboard: [`src/template/views/navigation/dashboard/Default.tsx`](../src/template/views/navigation/dashboard/Default.tsx)
- buttons: [`src/template/views/components/basic/Button.tsx`](../src/template/views/components/basic/Button.tsx)
- badges: [`src/template/views/components/basic/Badges.tsx`](../src/template/views/components/basic/Badges.tsx)
- breadcrumb: [`src/template/views/components/basic/Breadcrumb.tsx`](../src/template/views/components/basic/Breadcrumb.tsx)
- collapse: [`src/template/views/components/basic/Collapse.tsx`](../src/template/views/components/basic/Collapse.tsx)
- tabs and pills: [`src/template/views/components/basic/TabsPills.tsx`](../src/template/views/components/basic/TabsPills.tsx)
- typography: [`src/template/views/components/basic/Typography.tsx`](../src/template/views/components/basic/Typography.tsx)
- form elements: [`src/template/views/forms/form-element/FormBasic.tsx`](../src/template/views/forms/form-element/FormBasic.tsx)
- bootstrap tables: [`src/template/views/table/bootstrap-table/BasicTable.tsx`](../src/template/views/table/bootstrap-table/BasicTable.tsx)
- apex charts: [`src/template/views/charts/ApexChart.tsx`](../src/template/views/charts/ApexChart.tsx)
- google map: [`src/template/views/maps/GoogleMap.tsx`](../src/template/views/maps/GoogleMap.tsx)
- login: [`src/template/views/auth/login/Login.tsx`](../src/template/views/auth/login/Login.tsx)
- register: [`src/template/views/auth/register/Register.tsx`](../src/template/views/auth/register/Register.tsx)

## Dashboard UI Catalog

These are dashboard-oriented UI pieces, not app architecture:

- page composition entry: [`src/template/views/navigation/dashboard/Default.tsx`](../src/template/views/navigation/dashboard/Default.tsx)
- export barrel: [`src/template/sections/dashboard/default/index.ts`](../src/template/sections/dashboard/default/index.ts)
- earnings chart card: [`src/template/sections/dashboard/EarningChart.tsx`](../src/template/sections/dashboard/EarningChart.tsx)
- recent users table card: [`src/template/sections/dashboard/RecentUsersCard.tsx`](../src/template/sections/dashboard/RecentUsersCard.tsx)
- users map card: [`src/template/sections/dashboard/UsersMap.tsx`](../src/template/sections/dashboard/UsersMap.tsx)
- rating card: [`src/template/sections/dashboard/default/RatingCard.tsx`](../src/template/sections/dashboard/default/RatingCard.tsx)
- sales performance card: [`src/template/components/cards/dashboard/SalesPerformanceCard.tsx`](../src/template/components/cards/dashboard/SalesPerformanceCard.tsx)
- social stats card: [`src/template/components/cards/dashboard/SocialStatsCard.tsx`](../src/template/components/cards/dashboard/SocialStatsCard.tsx)
- stat indicator card: [`src/template/components/cards/dashboard/StatIndicatorCard.tsx`](../src/template/components/cards/dashboard/StatIndicatorCard.tsx)

## Basic UI Catalog

### Buttons

The buttons page aggregates `21` section modules:

- demo page: [`src/template/views/components/basic/Button.tsx`](../src/template/views/components/basic/Button.tsx)
- [`src/template/sections/components/basic/button/DefaultButton.tsx`](../src/template/sections/components/basic/button/DefaultButton.tsx)
- [`src/template/sections/components/basic/button/LightButton.tsx`](../src/template/sections/components/basic/button/LightButton.tsx)
- [`src/template/sections/components/basic/button/LinkButton.tsx`](../src/template/sections/components/basic/button/LinkButton.tsx)
- [`src/template/sections/components/basic/button/OutLineButton.tsx`](../src/template/sections/components/basic/button/OutLineButton.tsx)
- [`src/template/sections/components/basic/button/DisabledButton.tsx`](../src/template/sections/components/basic/button/DisabledButton.tsx)
- [`src/template/sections/components/basic/button/ShadowButton.tsx`](../src/template/sections/components/basic/button/ShadowButton.tsx)
- [`src/template/sections/components/basic/button/LargeButton.tsx`](../src/template/sections/components/basic/button/LargeButton.tsx)
- [`src/template/sections/components/basic/button/SmallButton.tsx`](../src/template/sections/components/basic/button/SmallButton.tsx)
- [`src/template/sections/components/basic/button/IconWithButton.tsx`](../src/template/sections/components/basic/button/IconWithButton.tsx)
- [`src/template/sections/components/basic/button/OutLineIconButton.tsx`](../src/template/sections/components/basic/button/OutLineIconButton.tsx)
- [`src/template/sections/components/basic/button/ButtonIcon.tsx`](../src/template/sections/components/basic/button/ButtonIcon.tsx)
- [`src/template/sections/components/basic/button/BasicButtonGroup.tsx`](../src/template/sections/components/basic/button/BasicButtonGroup.tsx)
- [`src/template/sections/components/basic/button/ToolbarButton.tsx`](../src/template/sections/components/basic/button/ToolbarButton.tsx)
- [`src/template/sections/components/basic/button/ToolbarInputButton.tsx`](../src/template/sections/components/basic/button/ToolbarInputButton.tsx)
- [`src/template/sections/components/basic/button/ToolbarSizeButton.tsx`](../src/template/sections/components/basic/button/ToolbarSizeButton.tsx)
- [`src/template/sections/components/basic/button/NestingButton.tsx`](../src/template/sections/components/basic/button/NestingButton.tsx)
- [`src/template/sections/components/basic/button/VerticalButton.tsx`](../src/template/sections/components/basic/button/VerticalButton.tsx)
- [`src/template/sections/components/basic/button/MixedStyleButton.tsx`](../src/template/sections/components/basic/button/MixedStyleButton.tsx)
- [`src/template/sections/components/basic/button/OutlineStyleButton.tsx`](../src/template/sections/components/basic/button/OutlineStyleButton.tsx)
- [`src/template/sections/components/basic/button/CheckboxButton.tsx`](../src/template/sections/components/basic/button/CheckboxButton.tsx)
- [`src/template/sections/components/basic/button/RadioButton.tsx`](../src/template/sections/components/basic/button/RadioButton.tsx)

### Badges

- demo page: [`src/template/views/components/basic/Badges.tsx`](../src/template/views/components/basic/Badges.tsx)
- [`src/template/sections/components/basic/badges/BasicBadge.tsx`](../src/template/sections/components/basic/badges/BasicBadge.tsx)
- [`src/template/sections/components/basic/badges/ButtonBadge.tsx`](../src/template/sections/components/basic/badges/ButtonBadge.tsx)
- [`src/template/sections/components/basic/badges/ContextualBadge.tsx`](../src/template/sections/components/basic/badges/ContextualBadge.tsx)
- [`src/template/sections/components/basic/badges/PillBadge.tsx`](../src/template/sections/components/basic/badges/PillBadge.tsx)
- [`src/template/sections/components/basic/badges/LightBadge.tsx`](../src/template/sections/components/basic/badges/LightBadge.tsx)

### Breadcrumbs

- demo page: [`src/template/views/components/basic/Breadcrumb.tsx`](../src/template/views/components/basic/Breadcrumb.tsx)
- [`src/template/sections/components/basic/breadcrumb/BreadcrumbBasic.tsx`](../src/template/sections/components/basic/breadcrumb/BreadcrumbBasic.tsx)
- [`src/template/sections/components/basic/breadcrumb/BreadcrumbIcon.tsx`](../src/template/sections/components/basic/breadcrumb/BreadcrumbIcon.tsx)
- [`src/template/sections/components/basic/breadcrumb/BreadcrumbCharacter.tsx`](../src/template/sections/components/basic/breadcrumb/BreadcrumbCharacter.tsx)
- [`src/template/sections/components/basic/breadcrumb/BreadcrumbEmbedded.tsx`](../src/template/sections/components/basic/breadcrumb/BreadcrumbEmbedded.tsx)
- [`src/template/sections/components/basic/breadcrumb/Breadcrumbs.tsx`](../src/template/sections/components/basic/breadcrumb/Breadcrumbs.tsx)

### Collapse And Accordion

- demo page: [`src/template/views/components/basic/Collapse.tsx`](../src/template/views/components/basic/Collapse.tsx)
- [`src/template/sections/components/basic/collapse/BasicCollapse.tsx`](../src/template/sections/components/basic/collapse/BasicCollapse.tsx)
- [`src/template/sections/components/basic/collapse/MultipleTargets.tsx`](../src/template/sections/components/basic/collapse/MultipleTargets.tsx)
- [`src/template/sections/components/basic/collapse/Accordion.tsx`](../src/template/sections/components/basic/collapse/Accordion.tsx)
- [`src/template/sections/components/basic/collapse/AccordionFlush.tsx`](../src/template/sections/components/basic/collapse/AccordionFlush.tsx)

### Tabs And Pills

- demo page: [`src/template/views/components/basic/TabsPills.tsx`](../src/template/views/components/basic/TabsPills.tsx)
- [`src/template/sections/components/basic/tabs-pills/BasicTabs.tsx`](../src/template/sections/components/basic/tabs-pills/BasicTabs.tsx)
- [`src/template/sections/components/basic/tabs-pills/BasicPills.tsx`](../src/template/sections/components/basic/tabs-pills/BasicPills.tsx)
- [`src/template/sections/components/basic/tabs-pills/VerticalPills.tsx`](../src/template/sections/components/basic/tabs-pills/VerticalPills.tsx)

### Typography

- demo page: [`src/template/views/components/basic/Typography.tsx`](../src/template/views/components/basic/Typography.tsx)
- [`src/template/sections/components/basic/typography/Heading.tsx`](../src/template/sections/components/basic/typography/Heading.tsx)
- [`src/template/sections/components/basic/typography/DisplayHeadings.tsx`](../src/template/sections/components/basic/typography/DisplayHeadings.tsx)
- [`src/template/sections/components/basic/typography/InlineTextElement.tsx`](../src/template/sections/components/basic/typography/InlineTextElement.tsx)
- [`src/template/sections/components/basic/typography/ContextualTextColors.tsx`](../src/template/sections/components/basic/typography/ContextualTextColors.tsx)
- [`src/template/sections/components/basic/typography/Unordered.tsx`](../src/template/sections/components/basic/typography/Unordered.tsx)
- [`src/template/sections/components/basic/typography/Ordered.tsx`](../src/template/sections/components/basic/typography/Ordered.tsx)
- [`src/template/sections/components/basic/typography/Unstyled.tsx`](../src/template/sections/components/basic/typography/Unstyled.tsx)
- [`src/template/sections/components/basic/typography/Blockquotes.tsx`](../src/template/sections/components/basic/typography/Blockquotes.tsx)
- [`src/template/sections/components/basic/typography/HorizontalDescription.tsx`](../src/template/sections/components/basic/typography/HorizontalDescription.tsx)

## Form UI Catalog

The form page aggregates `14` form-focused section modules plus the auth forms:

- demo page: [`src/template/views/forms/form-element/FormBasic.tsx`](../src/template/views/forms/form-element/FormBasic.tsx)
- validation helper rules: [`src/template/utils/validationSchema.ts`](../src/template/utils/validationSchema.ts)
- [`src/template/sections/components/form-element/FormControls.tsx`](../src/template/sections/components/form-element/FormControls.tsx)
- [`src/template/sections/components/form-element/Sizing.tsx`](../src/template/sections/components/form-element/Sizing.tsx)
- [`src/template/sections/components/form-element/Picker.tsx`](../src/template/sections/components/form-element/Picker.tsx)
- [`src/template/sections/components/form-element/DataList.tsx`](../src/template/sections/components/form-element/DataList.tsx)
- [`src/template/sections/components/form-element/FormControlState.tsx`](../src/template/sections/components/form-element/FormControlState.tsx)
- [`src/template/sections/components/form-element/InlineForm.tsx`](../src/template/sections/components/form-element/InlineForm.tsx)
- [`src/template/sections/components/form-element/FormGrid.tsx`](../src/template/sections/components/form-element/FormGrid.tsx)
- [`src/template/sections/components/form-element/HorizontalForm.tsx`](../src/template/sections/components/form-element/HorizontalForm.tsx)
- [`src/template/sections/components/form-element/ValidationForm.tsx`](../src/template/sections/components/form-element/ValidationForm.tsx)
- [`src/template/sections/components/form-element/SupportedElements.tsx`](../src/template/sections/components/form-element/SupportedElements.tsx)
- [`src/template/sections/components/form-element/Tooltips.tsx`](../src/template/sections/components/form-element/Tooltips.tsx)
- [`src/template/sections/components/form-element/CheckRadio.tsx`](../src/template/sections/components/form-element/CheckRadio.tsx)
- [`src/template/sections/components/form-element/InputGroup.tsx`](../src/template/sections/components/form-element/InputGroup.tsx)
- [`src/template/sections/components/form-element/CustomForms.tsx`](../src/template/sections/components/form-element/CustomForms.tsx)

Auth UI surfaces:

- login page shell: [`src/template/views/auth/login/Login.tsx`](../src/template/views/auth/login/Login.tsx)
- register page shell: [`src/template/views/auth/register/Register.tsx`](../src/template/views/auth/register/Register.tsx)
- login form: [`src/template/sections/auth/AuthLogin.tsx`](../src/template/sections/auth/AuthLogin.tsx)
- register form: [`src/template/sections/auth/AuthRegister.tsx`](../src/template/sections/auth/AuthRegister.tsx)

## Table UI Catalog

- demo page: [`src/template/views/table/bootstrap-table/BasicTable.tsx`](../src/template/views/table/bootstrap-table/BasicTable.tsx)
- [`src/template/sections/tables/bootstrap-table/basic-table/BasicTable.tsx`](../src/template/sections/tables/bootstrap-table/basic-table/BasicTable.tsx)
- [`src/template/sections/tables/bootstrap-table/basic-table/HoverTable.tsx`](../src/template/sections/tables/bootstrap-table/basic-table/HoverTable.tsx)
- [`src/template/sections/tables/bootstrap-table/basic-table/DarkTable.tsx`](../src/template/sections/tables/bootstrap-table/basic-table/DarkTable.tsx)
- [`src/template/sections/tables/bootstrap-table/basic-table/StripedTable.tsx`](../src/template/sections/tables/bootstrap-table/basic-table/StripedTable.tsx)
- [`src/template/sections/tables/bootstrap-table/basic-table/ContextualTable.tsx`](../src/template/sections/tables/bootstrap-table/basic-table/ContextualTable.tsx)

## Chart UI Catalog

- demo page: [`src/template/views/charts/ApexChart.tsx`](../src/template/views/charts/ApexChart.tsx)
- [`src/template/sections/charts/apex-charts/BarChart.tsx`](../src/template/sections/charts/apex-charts/BarChart.tsx)
- [`src/template/sections/charts/apex-charts/BarStackedChart.tsx`](../src/template/sections/charts/apex-charts/BarStackedChart.tsx)
- [`src/template/sections/charts/apex-charts/BarHorizontalChart.tsx`](../src/template/sections/charts/apex-charts/BarHorizontalChart.tsx)
- [`src/template/sections/charts/apex-charts/BarHorizontalStackedChart.tsx`](../src/template/sections/charts/apex-charts/BarHorizontalStackedChart.tsx)

## Map UI Catalog

- demo page: [`src/template/views/maps/GoogleMap.tsx`](../src/template/views/maps/GoogleMap.tsx)
- google map card: [`src/template/sections/maps/google-maps/BasicMap.tsx`](../src/template/sections/maps/google-maps/BasicMap.tsx)
- vector map card used in dashboard: [`src/template/sections/dashboard/UsersMap.tsx`](../src/template/sections/dashboard/UsersMap.tsx)

## Dependency Notes By UI Family

- Most UI pieces depend on `react-bootstrap` plus the template SCSS and icon fonts.
- `MainCard.tsx` is the shared wrapper most worth preserving when borrowing template UI.
- Buttons, badges, breadcrumbs, collapse, tabs, typography, forms, and tables are mostly local React-Bootstrap compositions.
- Auth forms depend on `react-hook-form`, [`src/template/utils/validationSchema.ts`](../src/template/utils/validationSchema.ts), and authentication page styling.
- Charts depend on `react-apexcharts` and the CSS tweaks in [`src/template/global.scss`](../src/template/global.scss).
- `BasicMap.tsx` depends on `@react-google-maps/api` and `VITE_APP_GOOGLE_MAPS_API_KEY`.
- `UsersMap.tsx` depends on `jsvectormap` and the CSS import in [`src/template/index.scss`](../src/template/index.scss).
- Sidebar scrolling depends on `simplebar-react`.
- Sidebar open-state management currently depends on `swr`, but that is shell wiring, not a core reusable visual primitive.

## Fast Lookup By Feature Shape

- KPI or analytics screen: start with the dashboard cards and sections, especially `SalesPerformanceCard`, `StatIndicatorCard`, `SocialStatsCard`, `EarningChart`, `RatingCard`, and `RecentUsersCard`.
- CRUD list page: start with the table variants and pair them with `MainCard`, breadcrumbs if desired, and one or more form sections.
- Detail or settings screen: start with `MainCard`, form sections, tabs/pills, and typography sections.
- Auth or public-entry screen: start with `AuthLogin`, `AuthRegister`, and the auth page shells if the centered template treatment is wanted.
- Navigation-heavy back-office shell: start with the dashboard layout, header, footer, drawer, and nav item/collapse modules.
- Chart-heavy screen: start with the Apex chart sections and the chart demo page.
- Map-heavy screen: start with `BasicMap` for Google Maps or `UsersMap` for a styled vector map card.

## Reuse Rule

Future agents should treat:

- `components/*`
- `sections/*`
- selected `layout/*`

as the primary UI library surface.

They should treat:

- `views/*`

as demo composition references.

They should treat:

- `routes/*`
- `menu-items/*`
- `api/menu.ts`

as template wiring, not the reusable UI library itself.
