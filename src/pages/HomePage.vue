<template>
  <hero-banner />
  <product-list :products="store.filteredProducts" />
  <loading-overlay v-if="!store.quantity" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { HeroBanner, ProductList, LoadingOverlay } from '@/components';
import { getProducts } from '@/services';
import { useProductStore } from '@/store';

const store = useProductStore();

async function getAllProducts() {
  if (!store.quantity) {
    const result = await getProducts();
    store.setProducts(result);
  }
}

onMounted(() => {
  getAllProducts();
});
</script>

<script lang="ts">
export default { name: 'HomePage' };
</script>
