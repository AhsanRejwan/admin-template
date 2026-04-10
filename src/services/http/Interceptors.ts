import type { AxiosInstance } from 'axios';

export function attachInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => config);

  instance.interceptors.response.use(
    (response) => response,
    async (error) => Promise.reject(error)
  );
}
