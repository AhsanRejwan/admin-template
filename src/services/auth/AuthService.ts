import { serviceLinks } from '@service/ServiceLinks';
import { httpClient } from '@service/http/HttpClient';
import type { TokenRequest } from '@models/auth/TokenRequest';
import type { TokenResponse } from '@models/auth/TokenResponse';

export const AuthService = {
  login: (request: TokenRequest) =>
    httpClient.post<TokenResponse, TokenRequest>(serviceLinks.auth.token(), request, { skipAuth: true }),
};
