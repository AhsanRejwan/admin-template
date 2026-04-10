export const appQueryKeys = {
  all: () => ['app'] as const,
  bootstrap: () => [...appQueryKeys.all(), 'bootstrap'] as const,
};
