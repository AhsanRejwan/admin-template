export const authQueryKeys = {
  all: () => ['auth'] as const,
  token: () => [...authQueryKeys.all(), 'token'] as const,
};
