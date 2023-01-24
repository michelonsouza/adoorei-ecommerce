<template>
  <div
    class="flex items-center justify-between mb-3 flex-col gap-2 sm:flex-row sm:gap-0"
  >
    <h1 class="text-2xl mb-3">Category: {{ mappedCategory }}</h1>
    <select-input
      :options="filterOptions"
      :value="filterBy"
      @change="handleFilter"
    />
  </div>
  <product-list v-if="!!filteredProducts.length" :products="filteredProducts" />
  <div v-else>
    <h1 class="text-3xl">
      There are no products in the category: <b>{{ mappedCategory }}</b>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useRoute } from 'vue-router';

import { ProductList, SelectInput, SelectOptionType } from '@/components';
import { CategoryTagEnum, CategoryTagKeys } from '@/enums';
import type { Product } from '@/models';
import { useProductStore } from '@/store';
import { sortProductsByKey } from '@/utils';

const route = useRoute();
const store = useProductStore();

const filterOptions: SelectOptionType<string>[] = [
  {
    label: 'Order by',
    value: '',
  },
  {
    label: 'Name',
    value: 'title',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'Rating',
    value: 'rating',
  },
];
const filterBy = ref<SelectOptionType<string>>(filterOptions[0]);

const mappedCategory = computed(
  () => CategoryTagEnum[route.params.category as CategoryTagKeys],
);

const filteredProducts = computed(() => {
  return [...store.products]
    .filter(product => product.category === String(mappedCategory.value))
    .sort(sortProductsByKey(filterBy.value.value as Partial<keyof Product>));
});

function handleFilter(value: SelectOptionType) {
  filterBy.value = value as SelectOptionType<string>;
}
</script>

<script lang="ts">
export default { name: 'CategoryProductPage' };
</script>
