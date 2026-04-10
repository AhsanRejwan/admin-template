import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { axiosInstance } from '@service/http/Axios';

type ResponseSelector<TResponse, TResult> = (data: TResponse, response: AxiosResponse<TResponse>) => TResult;

export type HttpRequestOptions<TResponse, TResult = TResponse> = AxiosRequestConfig & {
  select?: ResponseSelector<TResponse, TResult>;
  skipAuth?: boolean;
  clearAuthOnUnauthorized?: boolean;
};

const resolveResponse = <TResponse, TResult = TResponse>(
  response: AxiosResponse<TResponse>,
  options?: HttpRequestOptions<TResponse, TResult>
) => {
  if (options?.select) {
    return options.select(response.data, response);
  }

  return response.data as unknown as TResult;
};

export const createHttpClient = (instance: AxiosInstance) => {
  return {
    get<TResponse, TResult = TResponse>(url: string, options?: HttpRequestOptions<TResponse, TResult>) {
      return instance.get<TResponse>(url, options).then((response) => resolveResponse(response, options));
    },
    delete<TResponse, TResult = TResponse>(url: string, options?: HttpRequestOptions<TResponse, TResult>) {
      return instance.delete<TResponse>(url, options).then((response) => resolveResponse(response, options));
    },
    post<TResponse, TRequest = unknown, TResult = TResponse>(
      url: string,
      data?: TRequest,
      options?: HttpRequestOptions<TResponse, TResult>
    ) {
      return instance.post<TResponse>(url, data, options).then((response) => resolveResponse(response, options));
    },
    put<TResponse, TRequest = unknown, TResult = TResponse>(
      url: string,
      data?: TRequest,
      options?: HttpRequestOptions<TResponse, TResult>
    ) {
      return instance.put<TResponse>(url, data, options).then((response) => resolveResponse(response, options));
    },
    patch<TResponse, TRequest = unknown, TResult = TResponse>(
      url: string,
      data?: TRequest,
      options?: HttpRequestOptions<TResponse, TResult>
    ) {
      return instance.patch<TResponse>(url, data, options).then((response) => resolveResponse(response, options));
    },
  };
};

export const httpClient = createHttpClient(axiosInstance);
