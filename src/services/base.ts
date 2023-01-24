import axios from 'axios';

import { encryptStorage } from '@/utils';

const token = encryptStorage.getItem<string>('token');

export const baseService = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    common: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  },
});
