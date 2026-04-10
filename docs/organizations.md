# Superuser Organizations Feature Implementation Plan

This document is the execution plan for building the Superuser Organizations module in the frontend app.

It is written to be followed by an implementation agent step by step.

Follow these source-of-truth documents while implementing:

- [`docs/architecture-feature-spec.md`](./architecture-feature-spec.md)
- [`docs/template-ui-library-index.md`](./template-ui-library-index.md)

Do not import final product code from `src/template`. If a missing reusable UI primitive is needed, extract the minimum required donor code into `src/ui` first.

## Objective

Build the Superuser Organizations page with:

- sidebar group label `Superuser`
- sidebar item label `Organizations`
- `/superuser` redirecting to `/superuser/organizations`
- paged table of organizations
- create organization button in the page header/card action area
- create modal with full organization form
- edit modal with immutable fields disabled
- delete confirmation modal
- right-side details aside that opens when a row is clicked
- `displayName` field shown above `slug` in the form
- `slug` initially suggested from `displayName` as a normalized hyphenated string
- React Query-backed CRUD flow
- backend-aligned validation and error handling

## Backend Contract Summary

The frontend must reflect the current backend behavior exactly.

### Endpoints

- `POST /api/v1/organizations`
- `GET /api/v1/organizations?page=<page>&size=<size>`
- `GET /api/v1/organizations/{organizationId}`
- `PATCH /api/v1/organizations/{organizationId}`
- `DELETE /api/v1/organizations/{organizationId}`

### Create payload

`slug`, `legalName`, `displayName`, `domainUrl`, `contactEmail`, `contactPhone`, `website`, `registrationNumber`, `taxId`, `country`, `timezone`, `addressLine1`, `addressLine2`, `city`, `state`, `postalCode`

### Update payload

`legalName`, `displayName`, `domainUrl`, `contactEmail`, `contactPhone`, `website`, `registrationNumber`, `taxId`, `country`, `timezone`, `addressLine1`, `addressLine2`, `city`, `state`, `postalCode`

`slug` is not part of update and must be treated as immutable in the UI.

### Response shapes

- list returns `OrganizationPageResult`
- list items are `OrganizationSummaryResult`
- details/create/update/delete return `OrganizationResult`

### Validation rules

- `slug` required on create
- `legalName` required on create
- `displayName` required on create
- slug format: lowercase letters, numbers, hyphens only
- reserved slugs: `api`, `www`, `admin`, `auth`, `docs`, `health`, `actuator`
- slug must be unique on create
- `contactEmail` must be a valid email shape when present
- `website` must be a valid absolute URL when present
- `domainUrl` must be a valid absolute URL when present
- list `page >= 0`
- list `1 <= size <= 100`
- update must contain at least one non-empty editable field

### Backend behavior that affects the UI

- list excludes deleted organizations
- details/update/delete treat deleted organizations as not found
- delete is a soft delete
- list is sorted by `createdAt desc`
- the backend update mapper sets every editable field from the submitted payload
- because of that update behavior, edit submissions must send a full editable snapshot, not a partial diff

### Error handling

Validation errors return a standard payload with:

- `message`
- `fieldErrors[]` with `field` and `message`

Conflict on duplicate slug may also arrive as a non-field `409` with message `Organization slug already exists`.

## Important Product Constraint

The requested blur-time or real-time server check for slug uniqueness must not be implemented because the current public backend API does not expose slug availability as a standalone capability.

Current backend reality:

- uniqueness is checked inside create validation and persistence only
- there is no `GET` or `POST` endpoint to validate a slug without creating an organization

Implementation approach for now:

- do not implement real-time slug availability checks
- do not call the list endpoint or any other endpoint as a slug-availability workaround
- implement only client-side slug format and reserved-slug validation on blur
- normalize slug to trimmed lowercase on blur
- perform actual uniqueness validation only during create submit
- if backend returns a duplicate-slug validation error or `409`, map that error back to the `slug` field

If a backend slug availability endpoint is added later, add a dedicated hook and wire it into slug blur validation.

## Implementation Principles

- pages remain thin
- containers own orchestration and API hook usage
- components remain presentational
- all forms use React Hook Form
- all API calls go through typed services and dedicated hooks
- all query keys live in `src/hooks/service/query-key`
- all user-facing copy goes into `src/constants/LanguageConstants.ts`
- all imports use aliases

## Step-By-Step Execution Plan

Execute the steps in order. Do not skip ahead until the current step is complete.

### Phase 1: Route And Navigation Wiring

1. Update [`src/constants/Routes.ts`](../src/constants/Routes.ts).
   Add:
   - `superuserOrganizations: '/superuser/organizations'`

2. Update [`src/constants/LanguageConstants.ts`](../src/constants/LanguageConstants.ts).
   Add or adjust copy for:
   - sidebar group label `Superuser`
   - sidebar item label `Organizations`
   - page title and subtitle
   - table headers
   - modal titles and action labels
   - form field labels, placeholders, descriptions, validation messages
   - details aside labels
   - delete confirmation text
   - loading, empty, and error states
   - generic server error messages

3. Update [`src/routes/Index.tsx`](../src/routes/Index.tsx).
   Required changes:
   - replace the current superuser sidebar group with group label `Superuser`
   - replace the current item label with `Organizations`
   - point the item to `ROUTES.superuserOrganizations`
   - add a route for the organizations page
   - make `/superuser` redirect to `/superuser/organizations`
   - treat organizations as the only superuser page for now
   - keep the route structure simple and avoid speculative sub-route abstractions until more superuser pages actually exist

4. Create [`src/pages/superuser/SuperuserOrganizationsPage.tsx`](../src/pages/superuser/SuperuserOrganizationsPage.tsx).
   Responsibilities:
   - render the organizations container only
   - no business logic

5. Remove or repurpose [`src/pages/superuser/SuperuserHomePage.tsx`](../src/pages/superuser/SuperuserHomePage.tsx) depending on the chosen route structure.
   Preferred approach:
   - keep it only if used as a redirect wrapper from `/superuser` to `/superuser/organizations`
   - otherwise replace usages with the organizations page route directly
   - do not treat it as a real standalone superuser page

### Phase 2: Domain Models

6. Create the `src/models/organization/` folder.

7. Add [`src/models/organization/OrganizationStatus.ts`](../src/models/organization/OrganizationStatus.ts).
   Include:
   - `ACTIVE`
   - `DELETED`

8. Add [`src/models/organization/Organization.ts`](../src/models/organization/Organization.ts).
   This should represent the full details model used by UI code.

9. Add [`src/models/organization/OrganizationSummary.ts`](../src/models/organization/OrganizationSummary.ts).
   This should represent one row in the list.

10. Add [`src/models/organization/OrganizationPageResponse.ts`](../src/models/organization/OrganizationPageResponse.ts).
    Include:
    - `items`
    - `totalElements`
    - `totalPages`
    - `page`
    - `size`

11. Add [`src/models/organization/CreateOrganizationRequest.ts`](../src/models/organization/CreateOrganizationRequest.ts).

12. Add [`src/models/organization/UpdateOrganizationRequest.ts`](../src/models/organization/UpdateOrganizationRequest.ts).

13. Add [`src/models/organization/OrganizationResponse.ts`](../src/models/organization/OrganizationResponse.ts) if the transport type is kept separate from the domain type.

14. Add [`src/models/organization/OrganizationSummaryResponse.ts`](../src/models/organization/OrganizationSummaryResponse.ts) if transport types are kept separate.

15. Add [`src/models/organization/OrganizationMapper.ts`](../src/models/organization/OrganizationMapper.ts) if any transformation is needed.
    Mapping responsibilities may include:
    - transport-to-domain conversion
    - date handling consistency
    - shared normalization helpers

16. Add models for standardized API errors if they do not already exist.
    Recommended files:
    - `src/models/common/ApiFieldError.ts`
    - `src/models/common/ApiErrorResponse.ts`

### Phase 3: Service Links And Raw API Layer

17. Update [`src/services/ServiceLinks.ts`](../src/services/ServiceLinks.ts).
    Use a plain flat object for links.
    Do not introduce a nested `organizations` object for this feature.
    Do not shape link names around CRUD verbs when that creates duplication.
    The keys should be self-contained and readable on their own.
    Recommended keys:
    - `authToken: () => '/v1/auth/token'`
    - `organizations: () => '/v1/organizations'`
    - `organization: (organizationId: number) => '/v1/organizations/${organizationId}'`

18. Create [`src/services/organization/OrganizationService.ts`](../src/services/organization/OrganizationService.ts).
    Include typed methods:
    - `getOrganizations`
    - `getOrganization`
    - `createOrganization`
    - `updateOrganization`
    - `deleteOrganization`

19. Ensure list requests pass pagination params through Axios `params`.

20. Keep the service layer framework-light.
    Do not put React Query logic in this file.
    Do not mirror CRUD verbs in `serviceLinks` names.
    Reuse the smallest clean set of endpoint links without duplication.

### Phase 4: Query Keys

21. Create [`src/hooks/service/query-key/OrganizationQueryKeys.ts`](../src/hooks/service/query-key/OrganizationQueryKeys.ts).

22. Implement the required key structure:
    - `all`
    - `list`
    - `pagedList`
    - `details`
    - `detailsById`

23. Keep all keys array-based and derived from parent scopes using spread syntax.

24. Use stable parameter ordering.
    Recommended `pagedList` signature:
    - `(page = 0, size = 20)`

### Phase 5: API Hooks

25. Create `src/hooks/service/organization/`.

26. Add [`src/hooks/service/organization/useGetOrganizations.ts`](../src/hooks/service/organization/useGetOrganizations.ts).
    Responsibilities:
    - query paged organizations
    - use `OrganizationQueryKeys.pagedList(page, size)`

27. Add [`src/hooks/service/organization/useGetOrganization.ts`](../src/hooks/service/organization/useGetOrganization.ts).
    Responsibilities:
    - fetch details by id
    - allow `enabled` control so the query only runs when an id exists

28. Add [`src/hooks/service/organization/useCreateOrganization.ts`](../src/hooks/service/organization/useCreateOrganization.ts).
    Responsibilities:
    - call create service
    - invalidate organization list queries on success

29. Add [`src/hooks/service/organization/useUpdateOrganization.ts`](../src/hooks/service/organization/useUpdateOrganization.ts).
    Responsibilities:
    - call update service
    - invalidate list and detail queries on success

30. Add [`src/hooks/service/organization/useDeleteOrganization.ts`](../src/hooks/service/organization/useDeleteOrganization.ts).
    Responsibilities:
    - call delete service
    - invalidate list and detail queries on success

31. Ensure each hook owns exactly one backend endpoint.

32. Reuse the shared query key factory for all `queryKey`, `invalidateQueries`, and any cache updates.

### Phase 6: Reusable UI Review

33. Review current app-owned UI in `src/ui`.

34. Reuse [`src/ui/MainCard.tsx`](../src/ui/MainCard.tsx) for the page shell.

35. Determine whether additional reusable UI primitives are needed.
    Likely candidates:
    - page header action layout
    - table empty state
    - right-side aside shell
    - confirmation modal shell

36. If a reusable primitive is missing, inspect the closest donor example under `src/template`.

37. If extraction is necessary, create app-owned primitives under `src/ui` rather than using `src/template` directly in feature code.

38. Do not import final feature code from `src/template/views/*` or `src/template/sections/*`.

### Phase 7: Feature Components

39. Create the folder `src/components/superuser/organizations/`.

40. Create [`src/components/superuser/organizations/OrganizationTable.tsx`](../src/components/superuser/organizations/OrganizationTable.tsx).
    Responsibilities:
    - render the minimal row view
    - render table header and rows
    - render a dedicated actions column
    - render loading state, empty state, and inline table error state
    - expose callbacks for row click, edit click, and delete click

41. Recommended table columns:
    - `Name`
    - `Slug`
    - `Updated`
    - `Actions`

42. Within the `Name` cell:
    - show `displayName` as the primary text
    - optionally show `legalName` as muted secondary text

43. Create [`src/components/superuser/organizations/OrganizationActionsDropdown.tsx`](../src/components/superuser/organizations/OrganizationActionsDropdown.tsx).
    Responsibilities:
    - render row actions dropdown
    - expose `Edit` and `Delete`
    - stop click propagation so opening the dropdown does not open the details aside

44. Create [`src/components/superuser/organizations/OrganizationFormModal.tsx`](../src/components/superuser/organizations/OrganizationFormModal.tsx).
    Responsibilities:
    - render the create/edit modal shell
    - own the React Hook Form instance unless a separate form component is preferred
    - support `create` and `edit` modes
    - disable immutable fields in edit mode
    - display field-level and form-level errors
    - expose a submit callback with typed values

45. Create [`src/components/superuser/organizations/OrganizationDetailsAside.tsx`](../src/components/superuser/organizations/OrganizationDetailsAside.tsx).
    Responsibilities:
    - slide in from the right
    - show full organization details
    - show metadata such as status, createdAt, updatedAt, createdBy, updatedBy
    - show loading, error, and not-found states
    - expose close action

46. Create [`src/components/superuser/organizations/DeleteOrganizationModal.tsx`](../src/components/superuser/organizations/DeleteOrganizationModal.tsx).
    Responsibilities:
    - prompt for confirmation
    - show organization name in the message
    - expose confirm and cancel callbacks
    - disable actions while deleting

47. If helpful, split the form body into a separate component:
    - `OrganizationFormFields.tsx`

48. Keep components presentation-focused.
    Do not call service hooks directly inside these components.

### Phase 8: Container Orchestration

49. Create [`src/containers/superuser/organizations/OrganizationManagementContainer.tsx`](../src/containers/superuser/organizations/OrganizationManagementContainer.tsx).

50. This container will be the main orchestration layer for the page.
    It should own:
    - current page number
    - page size
    - selected organization id for the aside
    - create modal open state
    - edit modal open state
    - delete modal open state
    - current organization being edited
    - current organization being deleted

51. Wire the list query using `useGetOrganizations(page, size)`.

52. Wire the details query using `useGetOrganization(selectedOrganizationId)`.

53. Wire create, update, and delete mutations in this container.

54. Define row click behavior:
    - clicking anywhere on a non-action area of a row opens the right-side details aside
    - selecting a row should load full details if not already loaded

55. Define create flow:
    - open empty modal
    - validate client-side
    - submit create request
    - on success close modal
    - invalidate list cache
    - optionally select the newly created organization and open the aside

56. Define edit flow:
    - open modal populated with organization details
    - if only summary data is available, load details before rendering the form or show loading state inside the modal
    - disable slug in edit mode
    - submit a full editable snapshot, not partial fields
    - on success close modal
    - invalidate list and details cache
    - if the edited organization is currently selected in the aside, keep the aside open and show refreshed data

57. Define delete flow:
    - open confirmation modal from row action
    - on confirm call delete mutation
    - on success close modal
    - if deleted organization is selected in aside, close the aside
    - invalidate list and details cache

58. Handle mutation error mapping in the container.
    Required behavior:
    - validation `fieldErrors` must be mapped to RHF `setError`
    - duplicate slug conflict must appear on the slug field during create
    - generic mutation failures must appear as a form-level or modal-level error

### Phase 9: Form Design And Validation

59. Use React Hook Form for the organization form.

60. Form fields to include in create mode:
    - displayName
    - slug
    - legalName
    - domainUrl
    - contactEmail
    - contactPhone
    - website
    - registrationNumber
    - taxId
    - country
    - timezone
    - addressLine1
    - addressLine2
    - city
    - state
    - postalCode

61. Edit mode should display the same fields, but `slug` must be disabled and excluded from the update payload.

62. Create a form values type that is specific to the modal UI.

63. Add client validation rules mirroring the backend:
    - slug required in create mode
    - legalName required in create mode
    - displayName required in create mode
    - slug regex validation
    - reserved slug validation
    - valid email validation
    - valid absolute URL validation for `domainUrl` and `website`

64. Add client normalization helpers:
    - trim text inputs on submit
    - lowercase and trim slug on blur and before submit
    - convert empty strings to `undefined` or omit them before request construction, depending on the selected request-building strategy

65. Implement create-mode slug suggestion behavior from `displayName`.
    Required behavior:
    - render `displayName` above `slug`
    - while the user has not manually edited the slug field, update slug automatically as `displayName` changes
    - slug suggestion must be a normalized hyphenated value derived from `displayName`
    - recommended normalization:
      - trim leading and trailing whitespace
      - lowercase all characters
      - collapse internal whitespace to single hyphens
      - collapse repeated hyphens
      - remove unsupported characters so the suggestion stays close to the backend slug format
    - once the user manually edits the slug field, stop auto-syncing from `displayName`
    - treat the generated slug as an initial suggestion only; the user may change it freely before submit

66. Respect backend update semantics.
    For edit mode:
    - build the update request from the full current form state
    - do not send only dirty fields

67. Ensure the modal save button is disabled while the relevant mutation is pending.

68. Decide whether to validate on `onBlur`, `onSubmit`, or `all`.
    Recommended:
    - `onBlur` for field feedback
    - submit-time final validation before mutation

69. For slug uniqueness:
    - do not implement blur-time or real-time server validation
    - do not fake a server check against the list endpoint
    - do not add polling, debouncing, or background slug-availability requests
    - validate format and reserved values on blur
    - rely on create submit only for true backend uniqueness validation

### Phase 10: Details Aside Design

69. Implement the details aside as a right-anchored panel.

70. The aside should contain:
    - title area
    - close button
    - key organization information
    - metadata section

71. Recommended details layout:
    - display name
    - legal name
    - slug
    - status
    - domain URL
    - website
    - contact email
    - contact phone
    - registration number
    - tax id
    - country
    - timezone
    - address block
    - created at/by
    - updated at/by

72. Add loading state while details are being fetched.

73. Add error state for detail fetch failure.

74. Add graceful empty state if no organization is selected.

75. Ensure the panel is keyboard accessible and closable by:
    - close button
    - overlay click if overlay is used
    - escape key if using a modal/offcanvas-like primitive

### Phase 11: Pagination And Table Behavior

76. Use backend paging from day one.

77. Start with page state in the container:
    - `page = 0`
    - `size = 20`

78. Render simple pagination controls below the table if the result spans multiple pages.

79. Prevent page underflow and overflow.

80. Reset selection if the selected row disappears after deletion or pagination changes.

81. Keep the table minimal and scan-friendly.
    Do not overload the list with all fields.

### Phase 12: Styling

82. Add feature-local styles under `src/assets/styles/` if needed.
    Recommended file:
    - `OrganizationManagement.css`

83. Import feature styles from the page or container, not from random child components, unless the style is tightly scoped.

84. Style goals:
    - align with the existing app shell
    - reuse Bootstrap structure where reasonable
    - keep spacing in `rem`
    - ensure modal and aside work on smaller screens

85. Add responsive behavior for:
    - table overflow
    - modal body scrolling
    - aside width on tablet/mobile

86. Do not pull in donor template SCSS wholesale for this feature.

### Phase 13: Error Handling Strategy

87. Add shared helpers for Axios error parsing if needed.

88. Standardize extraction of:
    - `status`
    - top-level `message`
    - `fieldErrors`

89. For create and edit form submission:
    - map `fieldErrors` to RHF
    - show top-level `message` near the form actions if there are no field errors

90. For list fetch failures:
    - show inline retry-capable error UI in the table card

91. For details fetch failures:
    - show inline error inside the aside

92. For unauthorized `401`:
    - rely on the existing interceptor/session-clearing flow

93. For `403`:
    - show a user-facing access-denied message if the page can render that state
    - otherwise let current auth/routing behavior handle it

### Phase 14: Copy And Accessibility

94. Ensure every user-facing string is sourced from [`src/constants/LanguageConstants.ts`](../src/constants/LanguageConstants.ts).

95. Add accessible labels for:
    - create button
    - actions menu toggle
    - edit action
    - delete action
    - aside close button
    - modal close buttons

96. Ensure table rows that act as click targets remain understandable for keyboard users.
    Recommended options:
    - row content button/link pattern
    - or explicit details action if full row interactivity becomes awkward

97. Ensure focus handling is correct when:
    - opening create modal
    - opening edit modal
    - closing modals
    - opening and closing aside

### Phase 15: File Inventory To Create Or Update

Expected updates:

- [`src/constants/Routes.ts`](../src/constants/Routes.ts)
- [`src/constants/LanguageConstants.ts`](../src/constants/LanguageConstants.ts)
- [`src/routes/Index.tsx`](../src/routes/Index.tsx)
- [`src/services/ServiceLinks.ts`](../src/services/ServiceLinks.ts)

Expected new files:

- [`src/pages/superuser/SuperuserOrganizationsPage.tsx`](../src/pages/superuser/SuperuserOrganizationsPage.tsx)
- [`src/models/organization/OrganizationStatus.ts`](../src/models/organization/OrganizationStatus.ts)
- [`src/models/organization/Organization.ts`](../src/models/organization/Organization.ts)
- [`src/models/organization/OrganizationSummary.ts`](../src/models/organization/OrganizationSummary.ts)
- [`src/models/organization/OrganizationPageResponse.ts`](../src/models/organization/OrganizationPageResponse.ts)
- [`src/models/organization/CreateOrganizationRequest.ts`](../src/models/organization/CreateOrganizationRequest.ts)
- [`src/models/organization/UpdateOrganizationRequest.ts`](../src/models/organization/UpdateOrganizationRequest.ts)
- [`src/models/organization/OrganizationMapper.ts`](../src/models/organization/OrganizationMapper.ts) if needed
- [`src/services/organization/OrganizationService.ts`](../src/services/organization/OrganizationService.ts)
- [`src/hooks/service/query-key/OrganizationQueryKeys.ts`](../src/hooks/service/query-key/OrganizationQueryKeys.ts)
- [`src/hooks/service/organization/useGetOrganizations.ts`](../src/hooks/service/organization/useGetOrganizations.ts)
- [`src/hooks/service/organization/useGetOrganization.ts`](../src/hooks/service/organization/useGetOrganization.ts)
- [`src/hooks/service/organization/useCreateOrganization.ts`](../src/hooks/service/organization/useCreateOrganization.ts)
- [`src/hooks/service/organization/useUpdateOrganization.ts`](../src/hooks/service/organization/useUpdateOrganization.ts)
- [`src/hooks/service/organization/useDeleteOrganization.ts`](../src/hooks/service/organization/useDeleteOrganization.ts)
- [`src/containers/superuser/organizations/OrganizationManagementContainer.tsx`](../src/containers/superuser/organizations/OrganizationManagementContainer.tsx)
- [`src/components/superuser/organizations/OrganizationTable.tsx`](../src/components/superuser/organizations/OrganizationTable.tsx)
- [`src/components/superuser/organizations/OrganizationActionsDropdown.tsx`](../src/components/superuser/organizations/OrganizationActionsDropdown.tsx)
- [`src/components/superuser/organizations/OrganizationFormModal.tsx`](../src/components/superuser/organizations/OrganizationFormModal.tsx)
- [`src/components/superuser/organizations/OrganizationDetailsAside.tsx`](../src/components/superuser/organizations/OrganizationDetailsAside.tsx)
- [`src/components/superuser/organizations/DeleteOrganizationModal.tsx`](../src/components/superuser/organizations/DeleteOrganizationModal.tsx)
- [`src/assets/styles/OrganizationManagement.css`](../src/assets/styles/OrganizationManagement.css) if needed

Optional shared files if the agent extracts reusable UI:

- new `src/ui/*` primitives created from minimal donor extraction

### Phase 16: Verification And Acceptance

98. Run `npm run lint`.

99. Run `npm run typecheck`.

100. Run `npm run build`.

101. Manually verify the following flows:
    - superuser login still works
    - sidebar shows `Superuser` group and `Organizations` item
    - organizations page loads list
- create modal opens and closes
- create succeeds with valid payload
- typing `displayName` auto-suggests `slug` until the slug is manually edited
- `displayName` appears above `slug` in create mode
- duplicate slug create surfaces field error
- invalid slug format is blocked client-side
- reserved slug is blocked client-side
    - invalid email is blocked client-side
- invalid absolute URL is blocked client-side
- clicking row opens details aside
- clicking actions toggle does not open aside
- edit modal opens with existing values
- slug is disabled in edit mode
- no real-time or blur-time slug availability API call is made
- duplicate slug is handled only from the create submission response
- edit preserves untouched editable values
- delete asks for confirmation
- delete removes the organization from the list after refetch
- deleting a selected organization closes the aside

102. Confirm there are no final imports from `src/template` in app-owned feature files.

103. Confirm all new user-facing copy comes from `lang`.

104. Confirm pages remain thin and API logic lives in hooks/services/container layers.
105. Confirm `/superuser` redirects directly to `/superuser/organizations`.

## Acceptance Criteria

The feature is complete only when all of the following are true:

- `/superuser/organizations` is the superuser landing page
- `/superuser` redirects to `/superuser/organizations`
- sidebar group label is `Superuser`
- sidebar item label is `Organizations`
- organizations list renders from backend data
- create, edit, and delete flows work end to end
- row click opens a right-side details panel
- edit does not allow slug modification
- create form shows `displayName` above `slug`
- create form auto-suggests slug from display name until slug is manually edited
- slug availability is not checked in real time and follows backend create-time validation behavior
- backend validation and conflict responses are surfaced correctly in the UI
- list cache is invalidated after create, update, and delete
- implementation follows the repo architecture rules
- no final product code is coupled to `src/template`

## Non-Goals For This Milestone

Do not add these unless explicitly requested:

- search or filtering
- sorting controls beyond backend default ordering
- bulk actions
- optimistic updates
- real-time slug availability checks
- blur-time slug availability API calls
- slug availability polling or ad hoc uniqueness workarounds
- inline row editing
- hierarchy integration from the organization details panel

## Final Notes For The Implementing Agent

- Do not implement edit updates as partial PATCH diffs. The backend mapper will null omitted editable fields.
- Do not implement real-time slug availability checks.
- Do not implement blur-time slug availability API calls.
- Do not attempt a fake slug uniqueness check by scanning the current page of organizations.
- Keep `serviceLinks` flat for this feature. Do not add a nested `organizations` link object.
- Keep `serviceLinks` readable. Prefer self-contained endpoint names like `organizations()` and `organization(id)` over duplicated CRUD-shaped names.
- Prefer simple, explicit code over abstractions that are not already justified by repetition.
- Keep the first version stable and architecture-compliant before considering refinement.
