<template>
  <div class="relative flex items-center">
    <input
      class="bg-transparent dark:text-white border rounded h-8 px-2"
      type="text"
      placeholder="Buscar..."
      @input="handleSearch"
    />
    <magnifying-glass-icon
      class="w-6 h-6 absolute right-2 text-gray-900 dark:text-white"
    />
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { debounce } from 'lodash';
import { useRouter, useRoute } from 'vue-router';

import { useProductStore } from '@/store';

const route = useRoute();
const router = useRouter();
const store = useProductStore();

const debounced = debounce((event: Event) => {
  const parsedTarget = <HTMLInputElement>event.target;

  store.searchProductText = parsedTarget.value || '';

  if (route.path !== '/') {
    router.push('/');
  }
}, 600);

function handleSearch(event: Event) {
  debounced(event);
}
</script>

<script lang="ts">
export default {
  name: 'SearchInput',
};
</script>
