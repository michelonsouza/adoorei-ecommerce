import { CategoryEnum } from '@/enums';

import { baseService } from './base';

export async function getCategories(): Promise<CategoryEnum[]> {
  const { data: result } = await baseService.get<CategoryEnum[]>(
    '/products/categories',
  );

  return result || null;
}
