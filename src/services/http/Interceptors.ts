import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { clearSuperuserSession, readSuperuserSession } from '@service/auth/SuperuserSessionStorage';

type AuthAwareRequestConfig = InternalAxiosRequestConfig & {
  skipAuth?: boolean;
};

export const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config: AuthAwareRequestConfig) => {
    if (config.skipAuth) {
      return config;
    }

    const session = readSuperuserSession();

    if (session) {
      config.headers.Authorization = `${session.tokenType} ${session.accessToken}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<AuthAwareRequestConfig>) => {
      const requestConfig = error.config as AuthAwareRequestConfig | undefined;

      if (error.response?.status === 401 && !requestConfig?.skipAuth) {
        clearSuperuserSession();
      }

      return Promise.reject(error);
    }
  );
};
