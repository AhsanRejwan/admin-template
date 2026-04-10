import type { ApiFieldError } from '@models/common/ApiFieldError';

export interface ApiErrorResponse {
  message: string;
  fieldErrors?: ApiFieldError[];
}
