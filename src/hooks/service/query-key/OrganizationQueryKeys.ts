export const organizationQueryKeys = {
  all: () => ['organizations'] as const,
  list: () => [...organizationQueryKeys.all(), 'list'] as const,
  pagedList: (page = 0, size = 20) => [...organizationQueryKeys.list(), { page, size }] as const,
  details: () => [...organizationQueryKeys.all(), 'details'] as const,
  detailsById: (id: number) => [...organizationQueryKeys.details(), id] as const,
};
