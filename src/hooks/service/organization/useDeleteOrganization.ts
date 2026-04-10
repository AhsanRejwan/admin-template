import { useMutation, useQueryClient } from '@tanstack/react-query';

import { organizationQueryKeys } from '@hooks/service/query-key/OrganizationQueryKeys';
import { OrganizationService } from '@service/organization/OrganizationService';

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => OrganizationService.deleteOrganization(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: organizationQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: organizationQueryKeys.detailsById(id) });
    },
  });
};
