export const serviceLinks = {
  authToken: () => '/v1/auth/token',
  organizations: () => '/v1/organizations',
  organization: (organizationId: number) => `/v1/organizations/${organizationId}`,
};
