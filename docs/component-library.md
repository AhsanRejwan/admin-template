# Component Library And UI Inventory

## Core Shell

### App And Routing

- App entry: [`src/App.jsx`](/home/ahsan/Projects/Personal/admin-template/src/App.jsx)
- Router setup: [`src/routes/index.jsx`](/home/ahsan/Projects/Personal/admin-template/src/routes/index.jsx)
- Default route path constant: [`src/config.js`](/home/ahsan/Projects/Personal/admin-template/src/config.js)

Primary route families:

- `/`: dashboard
- `/basic/*`: UI component demos
- `/forms/form-elements/basic`: form demos
- `/tables/bootstrap-table/basic-table`: table demos
- `/charts/apex-chart`: chart demos
- `/map/google-map`: map demo
- `/login`: auth login
- `/register`: auth register
- `/other/sample-page`: spare content page

### Dashboard Layout

- Shell wrapper: [`src/layout/Dashboard/index.jsx`](/home/ahsan/Projects/Personal/admin-template/src/layout/Dashboard/index.jsx)
- Header: [`src/layout/Dashboard/Header.jsx`](/home/ahsan/Projects/Personal/admin-template/src/layout/Dashboard/Header.jsx)
- Footer: [`src/layout/Dashboard/Footer.jsx`](/home/ahsan/Projects/Personal/admin-template/src/layout/Dashboard/Footer.jsx)
- Drawer root: [`src/layout/Dashboard/Drawer/index.jsx`](/home/ahsan/Projects/Personal/admin-template/src/layout/Dashboard/Drawer/index.jsx)
- Vertical drawer: [`src/layout/Dashboard/Drawer/vertical/VerticalDrawer.jsx`](/home/ahsan/Projects/Personal/admin-template/src/layout/Dashboard/Drawer/vertical/VerticalDrawer.jsx)
- Drawer logic: [`src/layout/Dashboard/Drawer/common/useDrawerLogic.js`](/home/ahsan/Projects/Personal/admin-template/src/layout/Dashboard/Drawer/common/useDrawerLogic.js)

Shell UI elements:

- persistent sidebar
- mobile overlay drawer
- top header with sidebar toggles
- search dropdown
- notification dropdown with scroll container
- user profile dropdown
- breadcrumb header
- content viewport
- footer links

### Navigation Primitives

- Menu source: [`src/menu-items/index.jsx`](/home/ahsan/Projects/Personal/admin-template/src/menu-items/index.jsx)
- Group renderer: [`src/layout/Dashboard/Drawer/DrawerContent/NavGroup.jsx`](/home/ahsan/Projects/Personal/admin-template/src/layout/Dashboard/Drawer/DrawerContent/NavGroup.jsx)
- Collapsible node renderer: [`src/layout/Dashboard/Drawer/DrawerContent/NavCollapse.jsx`](/home/ahsan/Projects/Personal/admin-template/src/layout/Dashboard/Drawer/DrawerContent/NavCollapse.jsx)
- Leaf item renderer: [`src/layout/Dashboard/Drawer/DrawerContent/NavItem.jsx`](/home/ahsan/Projects/Personal/admin-template/src/layout/Dashboard/Drawer/DrawerContent/NavItem.jsx)

Navigation item types:

- `group`
- `collapse`
- `item`

Navigation groups present in the template:

- Navigation
- Ui Components
- Forms
- Tables
- Charts-maps
- Pages
- Other

## Reusable Application Components

### Primary Reusable Pieces

- `MainCard`: [`src/components/MainCard.jsx`](/home/ahsan/Projects/Personal/admin-template/src/components/MainCard.jsx)
- `Breadcrumbs`: [`src/components/Breadcrumbs.jsx`](/home/ahsan/Projects/Personal/admin-template/src/components/Breadcrumbs.jsx)
- `NavigationScroll`: [`src/components/NavigationScroll.jsx`](/home/ahsan/Projects/Personal/admin-template/src/components/NavigationScroll.jsx)
- `Loader`: [`src/components/Loader.jsx`](/home/ahsan/Projects/Personal/admin-template/src/components/Loader.jsx)
- `Loadable`: [`src/components/Loadable.jsx`](/home/ahsan/Projects/Personal/admin-template/src/components/Loadable.jsx)
- `ReferenceHeader`: [`src/components/ReferenceHeader.jsx`](/home/ahsan/Projects/Personal/admin-template/src/components/ReferenceHeader.jsx)
- `SimpleBarScroll`: [`src/components/third-party/SimpleBar.jsx`](/home/ahsan/Projects/Personal/admin-template/src/components/third-party/SimpleBar.jsx)

What to reuse:

- `MainCard` for almost all new content modules
- `Breadcrumbs` via menu configuration, not by manual per-page duplication
- `ReferenceHeader` only for demo/documentation-style pages, not core product screens

### Dashboard Widgets

- Sales performance card: [`src/components/cards/dashboard/SalesPerformanceCard.jsx`](/home/ahsan/Projects/Personal/admin-template/src/components/cards/dashboard/SalesPerformanceCard.jsx)
- Social stats card: [`src/components/cards/dashboard/SocialStatsCard.jsx`](/home/ahsan/Projects/Personal/admin-template/src/components/cards/dashboard/SocialStatsCard.jsx)
- Stat indicator card: [`src/components/cards/dashboard/StatIndicatorCard.jsx`](/home/ahsan/Projects/Personal/admin-template/src/components/cards/dashboard/StatIndicatorCard.jsx)
- Earnings chart: [`src/sections/dashboard/EarningChart.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/dashboard/EarningChart.jsx)
- Users map: [`src/sections/dashboard/UsersMap.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/dashboard/UsersMap.jsx)
- Rating card: [`src/sections/dashboard/default/RatingCard.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/dashboard/default/RatingCard.jsx)
- Recent users card: [`src/sections/dashboard/RecentUsersCard.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/dashboard/RecentUsersCard.jsx)

Widget patterns:

- KPI + icon + progress
- KPI + trend indicator
- compact social/stat summaries
- chart-in-card
- map-in-card
- table-in-card
- rating distribution with progress bars

## Page Inventory

### Dashboard

Page file:

- [`src/views/navigation/dashboard/Default.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/navigation/dashboard/Default.jsx)

Contained UI elements:

- 3 sales summary cards
- 1 geographic map card
- 1 highlighted earnings chart card
- 1 compact stat indicator card
- 3 social stat cards
- 1 rating summary card
- 1 recent users data table card

### Basic UI Component Pages

Button page:

- view: [`src/views/components/basic/Button.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/components/basic/Button.jsx)
- sections:
  - default buttons
  - light buttons
  - link buttons
  - outline buttons
  - disabled buttons
  - shadow buttons
  - large buttons
  - small buttons
  - icon buttons
  - outline icon buttons
  - button icon layouts
  - basic button groups
  - toolbars
  - input toolbars
  - size toolbars
  - nested dropdown buttons
  - vertical button groups
  - mixed styles
  - outline styles
  - checkbox toggle buttons
  - radio toggle buttons

Badge page:

- view: [`src/views/components/basic/Badges.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/components/basic/Badges.jsx)
- sections:
  - basic badges
  - badge-in-button
  - contextual badges
  - pill badges
  - light badges

Breadcrumb page:

- view: [`src/views/components/basic/Breadcrumb.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/components/basic/Breadcrumb.jsx)
- sections from `src/sections/components/basic/breadcrumb/*`:
  - basic breadcrumb
  - icon breadcrumb
  - separator/character breadcrumb
  - embedded breadcrumb
  - generated breadcrumb composition

Collapse page:

- view: [`src/views/components/basic/Collapse.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/components/basic/Collapse.jsx)
- sections:
  - basic collapse
  - multi-target collapse
  - accordion
  - flush accordion

Tabs and pills page:

- view: [`src/views/components/basic/TabsPills.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/components/basic/TabsPills.jsx)
- sections:
  - standard tabs
  - horizontal pills
  - vertical pills

Typography page:

- view: [`src/views/components/basic/Typography.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/components/basic/Typography.jsx)
- sections:
  - heading scale
  - display headings
  - inline text elements
  - contextual text colors
  - unordered lists
  - ordered lists
  - unstyled lists
  - blockquotes
  - horizontal description list

### Forms

Form demo view:

- [`src/views/forms/form-element/FormBasic.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/forms/form-element/FormBasic.jsx)

Included form modules:

- [`src/sections/components/form-element/FormControls.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/FormControls.jsx)
- [`src/sections/components/form-element/Sizing.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/Sizing.jsx)
- [`src/sections/components/form-element/Picker.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/Picker.jsx)
- [`src/sections/components/form-element/DataList.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/DataList.jsx)
- [`src/sections/components/form-element/FormControlState.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/FormControlState.jsx)
- [`src/sections/components/form-element/InlineForm.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/InlineForm.jsx)
- [`src/sections/components/form-element/FormGrid.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/FormGrid.jsx)
- [`src/sections/components/form-element/HorizontalForm.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/HorizontalForm.jsx)
- [`src/sections/components/form-element/ValidationForm.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/ValidationForm.jsx)
- [`src/sections/components/form-element/SupportedElements.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/SupportedElements.jsx)
- [`src/sections/components/form-element/Tooltips.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/Tooltips.jsx)
- [`src/sections/components/form-element/CheckRadio.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/CheckRadio.jsx)
- [`src/sections/components/form-element/InputGroup.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/InputGroup.jsx)
- [`src/sections/components/form-element/CustomForms.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/components/form-element/CustomForms.jsx)

Low-level form elements covered by the template:

- text input
- email input
- password input
- textarea
- select
- multi-column field layout
- inline form
- horizontal form
- validation feedback
- tooltip feedback
- datalist
- range/picker style controls
- checkbox
- radio
- switch
- file-like input group patterns
- prefixed/suffixed input groups
- split-button and dropdown input groups

### Tables

Table demo view:

- [`src/views/table/bootstrap-table/BasicTable.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/table/bootstrap-table/BasicTable.jsx)

Table variants:

- basic table
- hover table
- dark table
- striped table
- contextual table

Source files:

- [`src/sections/tables/bootstrap-table/basic-table/BasicTable.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/tables/bootstrap-table/basic-table/BasicTable.jsx)
- [`src/sections/tables/bootstrap-table/basic-table/HoverTable.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/tables/bootstrap-table/basic-table/HoverTable.jsx)
- [`src/sections/tables/bootstrap-table/basic-table/DarkTable.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/tables/bootstrap-table/basic-table/DarkTable.jsx)
- [`src/sections/tables/bootstrap-table/basic-table/StripedTable.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/tables/bootstrap-table/basic-table/StripedTable.jsx)
- [`src/sections/tables/bootstrap-table/basic-table/ContextualTable.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/tables/bootstrap-table/basic-table/ContextualTable.jsx)

### Charts

Chart view:

- [`src/views/charts/ApexChart.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/charts/ApexChart.jsx)

Chart modules:

- bar chart
- stacked bar chart
- horizontal bar chart
- horizontal stacked bar chart

Source files:

- [`src/sections/charts/apex-charts/BarChart.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/charts/apex-charts/BarChart.jsx)
- [`src/sections/charts/apex-charts/BarStackedChart.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/charts/apex-charts/BarStackedChart.jsx)
- [`src/sections/charts/apex-charts/BarHorizontalChart.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/charts/apex-charts/BarHorizontalChart.jsx)
- [`src/sections/charts/apex-charts/BarHorizontalStackedChart.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/charts/apex-charts/BarHorizontalStackedChart.jsx)

### Maps

Map view:

- [`src/views/maps/GoogleMap.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/maps/GoogleMap.jsx)

Map module:

- [`src/sections/maps/google-maps/BasicMap.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/maps/google-maps/BasicMap.jsx)

### Authentication

Page shells:

- login page: [`src/views/auth/login/Login.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/auth/login/Login.jsx)
- register page: [`src/views/auth/register/Register.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/auth/register/Register.jsx)

Form modules:

- login form: [`src/sections/auth/AuthLogin.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/auth/AuthLogin.jsx)
- register form: [`src/sections/auth/AuthRegister.jsx`](/home/ahsan/Projects/Personal/admin-template/src/sections/auth/AuthRegister.jsx)

Auth UI elements:

- centered auth card
- logo region
- email and password fields
- inline password visibility action
- checkbox agreement / remember-me controls
- primary submit button
- secondary route link to the other auth page
- decorative auth background shapes

### Other

- sample content page: [`src/views/SamplePage.jsx`](/home/ahsan/Projects/Personal/admin-template/src/views/SamplePage.jsx)
- spare route useful for first custom feature scaffolding

## React-Bootstrap Primitive Inventory

The following low-level primitives are actively used in the template:

- `Accordion`
- `Alert`
- `Badge`
- `Breadcrumb`
- `Button`
- `ButtonGroup`
- `ButtonToolbar`
- `Card`
- `Col`
- `Collapse`
- `Dropdown`
- `DropdownButton`
- `Form`
- `Image`
- `InputGroup`
- `ListGroup`
- `Nav`
- `ProgressBar`
- `Row`
- `SplitButton`
- `Stack`
- `Tab`
- `Table`
- `Tabs`
- `ToggleButton`
- `ToggleButtonGroup`

## State And Behavior Utilities

- SWR-backed menu state: [`src/api/menu.js`](/home/ahsan/Projects/Personal/admin-template/src/api/menu.js)
- Validation rules used by auth pages: [`src/utils/validationSchema.js`](/home/ahsan/Projects/Personal/admin-template/src/utils/validationSchema.js)

Behavior patterns:

- drawer open/close via SWR local state
- route-aware menu selection
- smooth scroll-to-top on route change
- desktop custom scrollbars via SimpleBar
- form validation through `react-hook-form`

## Best Existing Building Blocks For New Product Features

Use these as the first-choice references:

- analytic dashboard or KPI screen: dashboard widgets in `src/views/navigation/dashboard/Default.jsx`
- settings or CRUD form: modules in `src/views/forms/form-element/FormBasic.jsx`
- index/list page: tables in `src/views/table/bootstrap-table/BasicTable.jsx` plus badges from the recent users card
- account access flows: auth modules in `src/sections/auth/*`
- content-heavy detail page: `MainCard` plus grid and typography demos
