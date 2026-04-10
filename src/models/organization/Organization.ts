import type { OrganizationStatus } from '@models/organization/OrganizationStatus';

export interface Organization {
  id: number;
  slug: string;
  legalName: string;
  displayName: string;
  domainUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  registrationNumber?: string;
  taxId?: string;
  country?: string;
  timezone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  status: OrganizationStatus;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}
