import { ApiFilters, User } from '@/models';

import { baseService } from './base';

export async function getUsers(params: ApiFilters): Promise<User[]> {
  const { data: result } = await baseService.get<User[]>('/users', {
    params,
  });

  return result || [];
}

export async function getSingleUser(userId: number): Promise<User | null> {
  const { data: result } = await baseService.get<User | null>(
    `/users/${userId}`,
  );

  return result || null;
}

export async function addNewUser(data: Omit<User, 'id'>): Promise<User | null> {
  const { data: result } = await baseService.post<User>('/users', data);

  return result || null;
}

export async function updateUser(
  userId: number,
  data: Omit<User, 'id'>,
): Promise<User | null> {
  const { data: result } = await baseService.put<User>(
    `/users/${userId}`,
    data,
  );

  return result || null;
}

export async function deleteUser(userId: number): Promise<User | null> {
  const { data: result } = await baseService.delete<User>(`/users/${userId}`);

  return result || null;
}
