import { useQuery } from '@tanstack/react-query';

import { organizationQueryKeys } from '@hooks/service/query-key/OrganizationQueryKeys';
import { OrganizationService } from '@service/organization/OrganizationService';

export const useGetOrganization = (id: number | null) => {
  return useQuery({
    queryKey: organizationQueryKeys.detailsById(id ?? 0),
    queryFn: () => OrganizationService.getOrganization(id!),
    enabled: id !== null,
  });
};
