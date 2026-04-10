# Architecture And Agentic Feature Spec

This document defines the required application architecture for all future feature work in this starter kit. It complements the extraction workflow in [`README.md`](../README.md) and the template donor index in [`docs/template-ui-library-index.md`](./template-ui-library-index.md).

This standard governs:

- source folder ownership
- page, container, and component boundaries
- REST service and React Query conventions
- query-key structure
- forms, routing, aliases, and model organization
- engineering principles and React coding conventions
- the required build workflow for new features

## Core Rules

1. Build product code under app-owned folders in `src/`. Do not keep growing `src/template` as a product surface.
2. Check `src/ui` first before extracting anything from `src/template`.
3. Pages stay thin. Containers own orchestration. Components own rendering.
4. All server communication goes through Axios-backed REST services and React Query hooks.
5. Every API endpoint gets its own hook.
6. Query keys live in `src/hooks/service/query-key`.
7. Forms use React Hook Form.
8. Routing uses the browser router with all path definitions centralized at the top level.
9. Major folders must be aliased. Do not use long relative imports like `../../../`.
10. All TypeScript file names must use PascalCase.
11. Hooks are the only file-name exception and must use lowercase `use...` naming.
12. New feature work must fit the folder structure below unless there is a strong repo-wide reason to evolve the standard.

## Engineering Principles

All app-owned feature work must follow these principles:

- SOLID: keep modules narrowly scoped, depend on abstractions where it materially improves change safety, and avoid components or services with mixed responsibilities
- DRY: centralize repeated endpoint paths, storage keys, mapping logic, and shared UI primitives, but do not create abstractions before duplication is real
- KISS: prefer small components, predictable data flow, and direct code over clever indirection
- YAGNI: do not add speculative hooks, providers, abstractions, or route layers before an active requirement exists
- functional React only: app-owned React modules must stay function-based; do not introduce class-based components or lifecycle-driven state containers
- arrow-function default: components, hooks, containers, layouts, contexts, and local React helpers should default to `const x = () => {}` declarations and use `function` only for a documented technical reason

These principles apply to implementation and structure. When they conflict, prefer the simplest design that preserves correctness and future change safety.

## Target Source Layout

```text
src/
  assets/
  ui/
  components/
    <feature>/
  containers/
    <feature>/
  contexts/
    <Context>/
  hooks/
    use<SharedHook>.ts
    service/
      query-key/
        <Feature>QueryKeys.ts
      <feature>/
        useGet<Resource>.ts
        useGetInfinite<Resource>.ts
        useCreate<Resource>.ts
        useUpdate<Resource>.ts
        useDelete<Resource>.ts
  constants/
    AppConstants.ts
    Routes.ts
    LanguageConstants.ts
  models/
    <feature>/
      <Domain>.ts
      <Domain>Request.ts
      <Domain>Response.ts
      <Domain>Mapper.ts
  pages/
    <feature>/
      <Feature>Page.tsx
  routes/
    Index.tsx
  services/
    ServiceLinks.ts
    http/
      Axios.ts
      Interceptors.ts
    <feature>/
      <Feature>Service.ts
```

## Folder Ownership

### `pages/`

Each file in `pages/` is a route-facing view entrypoint. A page should:

- read route params if needed
- assemble layout and one or more containers
- stay small and declarative
- avoid direct Axios usage, React Query setup, and large business logic blocks

Page files should look like route wrappers, not feature implementations.

### `containers/`

Containers own orchestration for a page or a major slice of a page. A container should:

- call service hooks
- read and update context
- coordinate UI state, search, pagination, filters, sorting, and submission flow
- compose feature components and `src/ui` primitives
- keep transport details out of components

Containers must be organized by major feature or module.

### `components/`

Components render reusable or feature-local UI. A component should:

- receive typed props
- stay focused on presentation and controlled interactions
- avoid direct REST calls by default
- live in feature subfolders when feature-specific
- move to `src/ui` only when it becomes broadly reusable across features

Components must be organized by major feature or module.

### `contexts/`

`contexts/` stores global React contexts and providers. Keep only truly app-level state here, such as:

- authenticated user and app bootstrapping
- theme and localization state
- global feature flags
- cross-feature UI state that cannot be kept local

Avoid putting page-local form state or server state in context. React Query already owns server state.

### `hooks/`

`hooks/` stores general reusable hooks. Examples:

- debouncing
- viewport or media hooks
- localizer helpers
- shared state helpers

`hooks/service/` is reserved for API-facing hooks only.

### `hooks/service/`

This folder contains all service hooks used for API calling. Rules:

- every API call is represented by an individual hook
- query hooks use `useQuery` or `useInfiniteQuery`
- mutation hooks use `useMutation`
- hooks return the React Query result and, when useful, the built query or mutation options
- containers consume these hooks directly
- pages and components should not instantiate Axios or call REST endpoints directly

Recommended examples:

- `src/hooks/service/dashboard/useGetDashboard.ts`
- `src/hooks/service/dashboard/useGetDashboardList.ts`
- `src/hooks/service/dashboard/useCreateDashboard.ts`
- `src/hooks/service/dashboard/useUpdateDashboard.ts`

### `hooks/service/query-key/`

All React Query key factories live here. Query-key structure is strict.

Required file structure:

- one file per major resource
- file names use PascalCase, for example `DashboardQueryKeys.ts`, `UserQueryKeys.ts`, `AccessPermissionQueryKeys.ts`
- each file exports one camelCase key factory object such as `dashboardQueryKeys`

Required key composition rules:

- every key is an array
- every child scope is derived from a parent scope using spread syntax
- no hook may define inline ad hoc query keys when a factory exists
- optional text filters should default to `''` when needed to keep key shapes stable
- paging and sorting parameters should be grouped into a final object entry
- parameter order must stay consistent across all keys in the same factory

Required hierarchy for standard resources:

- `all()` returns the root resource scope
- `list()` returns the list scope
- `details()` returns the detail scope
- `detailsById(id)` returns the detail-by-id scope
- `pagedList(...)` derives from `list()`
- `infinitePagedList(...)` derives from `list()`

Required hierarchy for nested resources:

- define a parent resource key first
- derive nested keys from that parent resource scope
- do not create a second unrelated root when the nested data belongs to the same resource tree

Standard pattern:

```ts
export const dashboardQueryKeys = {
    all: () => ['dashboards'],
    list: () => [...dashboardQueryKeys.all(), 'list'],
    pagedList: (term: string, pageNumber = 0, pageSize = 20, sort?: SortOrder) => [
        ...dashboardQueryKeys.list(),
        term,
        {pageNumber, pageSize, sort},
    ],
    infinitePagedList: (term = '') => [
        ...dashboardQueryKeys.list(),
        term,
        'infinite',
    ],
    details: () => [...dashboardQueryKeys.all(), 'details'],
    detailsById: (id: number) => [...dashboardQueryKeys.details(), id],
};
```

Nested-resource pattern:

```ts
export const accessPermissionQueryKeys = {
    all: () => ['access-permissions'],
    resource: (resourceType: string, resourceId: number) => [
        ...accessPermissionQueryKeys.all(),
        'resource',
        resourceType,
        resourceId,
    ],
    assignedMembers: (resourceType: string, resourceId: number, searchTerm = '') => [
        ...accessPermissionQueryKeys.resource(resourceType, resourceId),
        'assigned-members',
        searchTerm,
    ],
    availableRoles: (resourceType: string, resourceId: number) => [
        ...accessPermissionQueryKeys.resource(resourceType, resourceId),
        'available-roles',
    ],
};
```

Invalidation rules:

- create and delete mutations usually invalidate `list()`
- update mutations usually invalidate both `list()` and `detailsById(id)` when both are cached
- nested-resource mutations invalidate the narrowest shared parent key that keeps cache behavior correct
- hooks must reuse the shared factory for all `queryKey`, `invalidateQueries`, `removeQueries`, and `setQueryData` calls

This folder is the single source of truth for React Query cache addressing.

### `constants/`

`constants/` holds fixed values that are not transport responses. Examples:

- route constants
- app-wide configuration values
- language and localization constants
- default page sizes, timeouts, and UI copy identifiers

Do not put environment-specific logic or derived state here.

### `services/`

`services/` is the raw API layer. It is responsible for:

- URI mapping
- Axios client creation
- request and response interceptors
- base URL wiring
- resource-oriented REST methods

`services/` must not contain React Query logic or component state. Keep it framework-light and testable.

Required service structure:

- `services/ServiceLinks.ts` contains the mapping of all HTTP URI paths used by the application
- `services/http/Axios.ts` creates the shared Axios instance and owns the base URL configuration
- `services/http/Interceptors.ts` contains shared request and response interceptors
- `services/<feature>/<Feature>Service.ts` exposes typed REST methods such as `getDashboard`, `listDashboards`, `createDashboard`

`ServiceLinks.ts` rules:

- store relative endpoint paths, not full URLs
- group links by resource or module
- keep dynamic segments in small functions
- do not duplicate URI strings inside service files

Example:

```ts
export const serviceLinks = {
    dashboards: {
        list: () => '/dashboards',
        details: (id: number) => `/dashboards/${id}`,
        favorite: (id: number) => `/dashboards/${id}/favorite`,
    },
};
```

Base URL rules:

- define the API base URL once in `services/http/Axios.ts` or an adjacent HTTP config module
- source the base URL from environment configuration
- keep `ServiceLinks.ts` base-url agnostic so the same URI mapping works across environments
- services combine the Axios instance with `ServiceLinks.ts` paths to execute requests

### `models/`

`models/` holds all domain objects, requests, responses, enums, and related transport types. Organize it by feature. Keep a clear distinction between:

- domain models used by UI code
- request payload models sent to the API
- response payload models returned by the API

If a REST response does not match the UI domain cleanly, add a typed mapper and keep the transformation out of pages and components.

## Routing Standard

Routing is centralized at the application root:

- use React Router's browser router stack at the application root
- keep all route path strings in a top-level constant file such as `src/constants/Routes.ts`
- compose the full route tree in one top-level router module such as `src/routes/Index.tsx`
- pages are the elements referenced by the router
- lazy loading is encouraged for major page entrypoints

Do not scatter route path literals across containers or feature components.

## REST Service And React Query Standard

Required request flow:

`page -> container -> service hook -> service -> Axios -> REST API`

Required response flow:

`REST API -> Axios -> service -> service hook -> container -> component`

Required conventions:

- Axios is the only HTTP client
- React Query is the server-state layer across all API calls
- every API endpoint gets one dedicated hook
- hooks must own cache keys and invalidation rules
- containers call hooks, not raw Axios
- components receive already-prepared data and callbacks from containers

Recommended split:

- `services/` contains typed request functions
- `hooks/service/<feature>/` wraps those functions with React Query
- `hooks/service/query-key/` provides cache key factories

## Form Standard

All forms must use React Hook Form for state management and submission.

Required conventions:

- initialize forms with `useForm`
- use `Controller` for controlled third-party inputs
- keep form submission and normalization in the container or a dedicated form component
- pass typed form values to mutation hooks
- surface server validation back into React Hook Form where applicable

Do not introduce Formik or ad hoc form state for new features.

## Alias Standard

All major folders must be imported through aliases. Do not rely on deep relative imports.

Required aliases:

- `@pages/*`
- `@containers/*`
- `@components/*`
- `@contexts/*`
- `@hooks/*`
- `@constants/*`
- `@models/*`
- `@service/*` mapped to `src/services/*`
- `@ui/*` mapped to `src/ui/*`
- `@assets/*`
- `@routes/*`

Example imports:

```ts
import {DashboardListPage} from '@pages/dashboard/DashboardListPage';
import {DashboardListContainer} from '@containers/dashboard/DashboardListContainer';
import {dashboardQueryKeys} from '@hooks/service/query-key/DashboardQueryKeys';
import {serviceLinks} from '@service/ServiceLinks';
import {ROUTES} from '@constants/Routes';
```

## Naming Conventions

- all TypeScript and TSX file names use PascalCase
- hooks are the only exception and must use lowercase `use...` naming
- pages: `FeaturePage.tsx`
- containers: `FeatureContainer.tsx`
- contexts: `AppContext.tsx`
- constants: `AppConstants.ts`, `Routes.ts`, `LanguageConstants.ts`
- query-key files: `DashboardQueryKeys.ts`
- service files: `DashboardService.ts`, `ServiceLinks.ts`, `Axios.ts`
- models: singular domain names such as `Dashboard.ts`, `DashboardRequest.ts`, `DashboardResponse.ts`

Use PascalCase for components, containers, pages, services, contexts, constants, and model files. Use camelCase for hooks and exported query-key objects.

## React Component And Function Standard

All app-owned React code must use function components. Do not introduce class-based React components.

Required conventions:

- components, pages, containers, layouts, contexts, and hooks should use arrow-function declarations such as `const DashboardPage = () => {}`
- prefer arrow functions for local helpers in React modules to keep style consistent
- use `function` declarations only when there is a clear technical reason, such as a library contract or a hoisting requirement that materially simplifies the code
- class-based React components are prohibited in app-owned code
- keep React modules declarative and avoid mixing rendering, transport, and persistence responsibilities
- extracted app-owned React modules must not keep importing template-owned stylesheets, icon-font bundles, or other donor-only presentation assets
- CSS must use relative units (`rem` for dimensions, spacing, and typography; `em` for media query breakpoints) unless a pixel value is technically required — for example, `1px` borders or `box-shadow` offsets where sub-pixel rendering demands it; z-index values remain unitless integers

`src/template` is a donor area, not the architectural reference for new product code. Validate extracted code against this standard when it moves into app-owned folders.

## Validation Checklist

Every feature review and completion pass must validate the following:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- no app-owned React module introduces a class-based component
- no app-owned React module uses `function` declarations for components, hooks, containers, layouts, or contexts unless the exception is clearly justified in code review
- the final structure still satisfies SOLID, DRY, KISS, and YAGNI rather than adding speculative abstractions

## Template Extraction Rule

This repo still contains a donor template under `src/template`. Feature work must follow the existing extraction workflow:

1. Check `src/ui` first.
2. If the UI already exists there, reuse or extend it.
3. Only if it does not exist in `src/ui`, inspect `src/template` and [`docs/template-ui-library-index.md`](./template-ui-library-index.md).
4. Extract the minimum needed code into app-owned folders.
5. Port the required styles, icons, and supporting assets into app-owned files as part of the same change.
6. Remove demo wiring, sample data, and template-only dependencies immediately.
7. Do not leave new product code coupled to `src/template`.

## Agentic Feature Delivery Workflow

When an agent builds a new feature, the expected order is:

1. Read `README.md`, this document, and the template UI index.
2. Confirm whether `src/ui` already has the needed reusable building blocks.
3. Define or extend route constants and the top-level router.
4. Add or update typed models under `src/models/<feature>`.
5. Add or update URI mappings in `src/services/ServiceLinks.ts`.
6. Create or extend the raw REST methods in `src/services/<feature>`.
7. Create query-key factories in `src/hooks/service/query-key`.
8. Create one React Query hook per API endpoint in `src/hooks/service/<feature>`.
9. Build the container logic in `src/containers/<feature>`.
10. Build or extract feature components in `src/components/<feature>` or `src/ui`.
11. Add the thin page entry in `src/pages/<feature>`.
12. Use aliases everywhere.
13. Port any required styling and presentation assets into app-owned files before calling the feature done.
14. Keep direct imports from `src/template` out of final feature code unless the task is explicitly mid-extraction.

## Definition Of Done For New Features

A feature is not complete unless it satisfies all of the following:

- page exists under `pages/`
- orchestration lives in `containers/`
- UI lives in `components/` or `src/ui`
- API access is implemented through Axios-backed React Query hooks
- query keys exist in `hooks/service/query-key`
- HTTP URI mappings exist in `services/ServiceLinks.ts`
- forms use React Hook Form
- route paths are defined centrally
- imports use aliases
- file names follow the naming convention in this document
- app-owned React modules use arrow-function declarations unless a clear technical exception exists
- extracted styling and presentation assets are app-owned, not still imported from `src/template`
- no new product dependency is introduced on `src/template`
