export interface UpdateOrganizationRequest {
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
}
