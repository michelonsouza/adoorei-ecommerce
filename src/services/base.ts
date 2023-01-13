import axios, {
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
  AxiosHeaders,
} from 'axios';

import { UnauthorizedError } from '@/errors';
import { encryptStorage } from '@/utils';

type InterceptorAxiosHeaders = (RawAxiosRequestHeaders | AxiosHeaders) & {
  Authorization?: string;
  authorization?: string;
};

interface InterceptorAxiosRequestConfig extends AxiosRequestConfig {
  headers?: InterceptorAxiosHeaders;
}

const token = encryptStorage.getItem<string>('token');

const baseService = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    common: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  },
});

baseService.interceptors.request.use(
  (config: InterceptorAxiosRequestConfig) => {
    const authorization =
      config?.headers?.Authorization || config?.headers?.authorization;
    const newToken = encryptStorage.getItem<string>('auth_token');
    const internConfig = { ...config };

    if (!authorization && !newToken) {
      throw new UnauthorizedError();
    }

    if (internConfig?.headers) {
      internConfig.headers.Authorization = newToken;
    }

    return internConfig;
  },
  error => Promise.reject(error),
);

export { baseService };
