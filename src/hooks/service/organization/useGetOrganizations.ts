import { useQuery } from '@tanstack/react-query';

import { organizationQueryKeys } from '@hooks/service/query-key/OrganizationQueryKeys';
import { OrganizationService } from '@service/organization/OrganizationService';

export const useGetOrganizations = (page = 0, size = 20) => {
  return useQuery({
    queryKey: organizationQueryKeys.pagedList(page, size),
    queryFn: () => OrganizationService.getOrganizations(page, size),
  });
};
