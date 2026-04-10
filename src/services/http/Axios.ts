import axios from 'axios';

import { attachInterceptors } from '@service/http/Interceptors';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

attachInterceptors(axiosInstance);
