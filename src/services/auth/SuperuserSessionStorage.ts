import type { TokenResponse } from '@models/auth/TokenResponse';

export const SUPERUSER_ACCESS_TOKEN_KEY = 'coperform_superuser_access_token';
export const SUPERUSER_REFRESH_TOKEN_KEY = 'coperform_superuser_refresh_token';
export const SUPERUSER_ACCESS_TOKEN_EXPIRES_AT_KEY = 'coperform_superuser_access_token_expires_at';
export const SUPERUSER_TOKEN_TYPE_KEY = 'coperform_superuser_token_type';
export const SUPERUSER_AUTH_CHANGE_EVENT = 'coperform:superuser-auth-change';

type SuperuserSession = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  tokenType: string;
};

const clearSuperuserSessionStorage = () => {
  localStorage.removeItem(SUPERUSER_ACCESS_TOKEN_KEY);
  localStorage.removeItem(SUPERUSER_REFRESH_TOKEN_KEY);
  localStorage.removeItem(SUPERUSER_ACCESS_TOKEN_EXPIRES_AT_KEY);
  localStorage.removeItem(SUPERUSER_TOKEN_TYPE_KEY);
};

const notifyAuthChange = () => {
  window.dispatchEvent(new Event(SUPERUSER_AUTH_CHANGE_EVENT));
};

export const readSuperuserSession = (): SuperuserSession | null => {
  const accessToken = localStorage.getItem(SUPERUSER_ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(SUPERUSER_REFRESH_TOKEN_KEY);
  const accessTokenExpiresAtRaw = localStorage.getItem(SUPERUSER_ACCESS_TOKEN_EXPIRES_AT_KEY);
  const tokenType = localStorage.getItem(SUPERUSER_TOKEN_TYPE_KEY);
  const accessTokenExpiresAt = Number(accessTokenExpiresAtRaw);

  if (
    !accessToken ||
    !refreshToken ||
    !accessTokenExpiresAtRaw ||
    !tokenType ||
    Number.isNaN(accessTokenExpiresAt) ||
    accessTokenExpiresAt <= Date.now()
  ) {
    clearSuperuserSessionStorage();
    return null;
  }

  return { accessToken, refreshToken, accessTokenExpiresAt, tokenType };
};

export const persistSuperuserSession = (response: TokenResponse) => {
  localStorage.setItem(SUPERUSER_ACCESS_TOKEN_KEY, response.accessToken);
  localStorage.setItem(SUPERUSER_REFRESH_TOKEN_KEY, response.refreshToken);
  localStorage.setItem(
    SUPERUSER_ACCESS_TOKEN_EXPIRES_AT_KEY,
    String(Date.now() + response.expiresIn * 1000)
  );
  localStorage.setItem(SUPERUSER_TOKEN_TYPE_KEY, response.tokenType || 'Bearer');
  notifyAuthChange();
};

export const clearSuperuserSession = () => {
  clearSuperuserSessionStorage();
  notifyAuthChange();
};
