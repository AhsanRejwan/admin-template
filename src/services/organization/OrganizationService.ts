import type { CreateOrganizationRequest } from '@models/organization/CreateOrganizationRequest';
import type { Organization } from '@models/organization/Organization';
import type { OrganizationPageResponse } from '@models/organization/OrganizationPageResponse';
import type { UpdateOrganizationRequest } from '@models/organization/UpdateOrganizationRequest';
import { httpClient } from '@service/http/HttpClient';
import { serviceLinks } from '@service/ServiceLinks';

export const OrganizationService = {
  getOrganizations: (page: number, size: number) =>
    httpClient.get<OrganizationPageResponse>(serviceLinks.organizations(), {
      params: { page, size },
      clearAuthOnUnauthorized: false,
    }),

  getOrganization: (organizationId: number) =>
    httpClient.get<Organization>(serviceLinks.organization(organizationId), {
      clearAuthOnUnauthorized: false,
    }),

  createOrganization: (request: CreateOrganizationRequest) =>
    httpClient.post<Organization, CreateOrganizationRequest>(
      serviceLinks.organizations(),
      request,
      { clearAuthOnUnauthorized: false },
    ),

  updateOrganization: (organizationId: number, request: UpdateOrganizationRequest) =>
    httpClient.patch<Organization, UpdateOrganizationRequest>(
      serviceLinks.organization(organizationId),
      request,
      { clearAuthOnUnauthorized: false },
    ),

  deleteOrganization: (organizationId: number) =>
    httpClient.delete<Organization>(serviceLinks.organization(organizationId), {
      clearAuthOnUnauthorized: false,
    }),
};
