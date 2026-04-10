import { useMutation, useQueryClient } from '@tanstack/react-query';

import { organizationQueryKeys } from '@hooks/service/query-key/OrganizationQueryKeys';
import type { CreateOrganizationRequest } from '@models/organization/CreateOrganizationRequest';
import { OrganizationService } from '@service/organization/OrganizationService';

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateOrganizationRequest) =>
      OrganizationService.createOrganization(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationQueryKeys.list() });
    },
  });
};
