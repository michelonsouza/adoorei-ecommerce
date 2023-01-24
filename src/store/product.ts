import { ref, computed } from 'vue';

import { defineStore } from 'pinia';

import { Product } from '@/models';
import { encryptStorage } from '@/utils';

const STORE_STORAGE_KEY = 'store:product';

export const useProductStore = defineStore('product', () => {
  const searchProductText = ref<string>('');

  const products = ref<Product[]>(
    encryptStorage.getItem<Product[]>(STORE_STORAGE_KEY) || [],
  );

  const filteredProducts = computed<Product[]>(() => {
    if (!searchProductText.value) {
      return products.value;
    }

    return products.value.filter(product => {
      const titleLower = product.title.toLowerCase();
      const descriptionLower = product.description.toLowerCase();
      const searchLower = searchProductText.value.toLowerCase();

      return (
        descriptionLower.includes(searchLower) ||
        titleLower.includes(searchLower)
      );
    });
  });

  const quantity = computed(() => {
    return products.value.length;
  });

  function setProducts(newProducts: Product[]): void {
    products.value = newProducts;
    encryptStorage.setItem(STORE_STORAGE_KEY, newProducts);
  }

  return {
    products,
    setProducts,
    quantity,
    filteredProducts,
    searchProductText,
  };
});
