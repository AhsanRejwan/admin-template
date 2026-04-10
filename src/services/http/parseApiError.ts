import type { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@models/common/ApiErrorResponse';
import type { ApiFieldError } from '@models/common/ApiFieldError';

export type ParsedApiError = {
  message: string;
  fieldErrors: ApiFieldError[];
  status: number | null;
};

export const parseApiError = (error: unknown): ParsedApiError => {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  const status = axiosError.response?.status ?? null;
  const data = axiosError.response?.data;

  const message =
    data?.message ??
    axiosError.message ??
    'Something went wrong. Please try again.';

  const fieldErrors = data?.fieldErrors ?? [];

  return { message, fieldErrors, status };
};
