import { useMutation, useQueryClient } from '@tanstack/react-query';

import { organizationQueryKeys } from '@hooks/service/query-key/OrganizationQueryKeys';
import type { UpdateOrganizationRequest } from '@models/organization/UpdateOrganizationRequest';
import { OrganizationService } from '@service/organization/OrganizationService';

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: UpdateOrganizationRequest }) =>
      OrganizationService.updateOrganization(id, request),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: organizationQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: organizationQueryKeys.detailsById(id) });
    },
  });
};
