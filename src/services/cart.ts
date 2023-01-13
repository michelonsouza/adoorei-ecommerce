import { ApiFilters, Cart, CartProduct } from '@/models';

import { baseService } from './base';

interface AddNewCartData {
  userId: number;
  date: string;
  producs: CartProduct[];
}

interface AddUpdateCartResponse extends AddNewCartData {
  id: number;
}

export async function getCarts(params: ApiFilters): Promise<Cart[]> {
  const { data: result } = await baseService.get<Cart[]>('/carts', {
    params,
  });

  return result || [];
}

export async function getSingleCart(cartId: number): Promise<Cart | null> {
  const { data: result } = await baseService.get<Cart | null>(
    `/carts/${cartId}`,
  );

  return result || null;
}

export async function getCartsInADateRange(
  startDate: string,
  endDate: string,
): Promise<Cart[]> {
  const { data: result } = await baseService.get<Cart[]>('/carts', {
    params: {
      startdate: startDate,
      enddate: endDate,
    },
  });

  return result || [];
}

export async function getUserCarts(userId: number): Promise<Cart[]> {
  const { data: result } = await baseService.get<Cart[]>(`/carts/${userId}`);

  return result || [];
}

export async function addNewCart(
  data: AddNewCartData,
): Promise<AddUpdateCartResponse | null> {
  const { data: result } = await baseService.post<AddUpdateCartResponse>(
    '/carts',
    data,
  );

  return result || null;
}

export async function updateCart(
  cartId: number,
  data: AddNewCartData,
): Promise<AddUpdateCartResponse | null> {
  const { data: result } = await baseService.put<AddUpdateCartResponse>(
    `/carts/${cartId}`,
    data,
  );

  return result || null;
}

export async function deleteCart(
  cartId: number,
): Promise<AddUpdateCartResponse | null> {
  const { data: result } = await baseService.delete<AddUpdateCartResponse>(
    `/carts/${cartId}`,
  );

  return result || null;
}
