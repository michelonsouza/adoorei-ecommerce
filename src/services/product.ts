import { CategoryEnum } from '@/enums';
import { ApiFilters, Product } from '@/models';

import { baseService } from './base';

export async function getProducts(params: ApiFilters): Promise<Product[]> {
  const { data: result } = await baseService.get<Product[]>('/products', {
    params,
  });

  return result || [];
}

export async function getSingleProduct(
  productId: number,
): Promise<Product | null> {
  const { data: result } = await baseService.get<Product | null>(
    `/products/${productId}`,
  );

  return result || null;
}

export async function getProductsByCategory(
  category: CategoryEnum,
): Promise<Product[]> {
  const { data: result } = await baseService.get<Product[]>(
    `products/category/${category}`,
  );

  return result || [];
}
