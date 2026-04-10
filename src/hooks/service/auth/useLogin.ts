import { useMutation } from '@tanstack/react-query';

import { authQueryKeys } from '@hooks/service/query-key/AuthQueryKeys';
import { AuthService } from '@service/auth/AuthService';
import type { TokenRequest } from '@models/auth/TokenRequest';

export const useLogin = () => {
  return useMutation({
    mutationKey: authQueryKeys.token(),
    mutationFn: (request: TokenRequest) => AuthService.login(request),
  });
};
