import { baseService } from './base';

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export async function login(data: LoginData): Promise<LoginResponse | null> {
  const { data: result } = await baseService.post<LoginResponse>(
    '/auth/login',
    data,
  );

  return result || null;
}
