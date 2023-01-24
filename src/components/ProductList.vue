<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4"
  >
    <product-card
      v-for="product in props.products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import { ProductCard } from '@/components';
import type { Product } from '@/models';

interface ProductListProps {
  products: Product[];
}

const props = defineProps<ProductListProps>();
</script>

<script lang="ts">
export default {
  name: 'ProductList',
};
</script>
