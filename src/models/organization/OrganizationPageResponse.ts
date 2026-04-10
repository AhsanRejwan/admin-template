import type { OrganizationSummary } from '@models/organization/OrganizationSummary';

export interface OrganizationPageResponse {
  items: OrganizationSummary[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
