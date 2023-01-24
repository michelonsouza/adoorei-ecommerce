<template>
  <h1 class="text-2xl mb-3">Category: {{ mappedCategory }}</h1>
  <product-list v-if="!!filteredProducts.length" :products="filteredProducts" />
  <div v-else>
    <h1 class="text-3xl">
      There are no products in the category: <b>{{ mappedCategory }}</b>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useRoute } from 'vue-router';

import { ProductList } from '@/components';
import { CategoryTagEnum, CategoryTagKeys } from '@/enums';
import { useProductStore } from '@/store';

const route = useRoute();
const store = useProductStore();

const mappedCategory = computed(
  () => CategoryTagEnum[route.params.category as CategoryTagKeys],
);

const filteredProducts = computed(() => {
  return store.products.filter(
    product => product.category === String(mappedCategory.value),
  );
});
</script>

<script lang="ts">
export default { name: 'CategoryProductPage' };
</script>
