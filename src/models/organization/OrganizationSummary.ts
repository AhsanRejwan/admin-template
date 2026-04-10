import type { OrganizationStatus } from '@models/organization/OrganizationStatus';

export interface OrganizationSummary {
  id: number;
  slug: string;
  legalName: string;
  displayName: string;
  status: OrganizationStatus;
  createdAt: string;
  updatedAt: string;
}
