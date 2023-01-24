<template>
  <app-header :open="menuIsOpen" @menu-open="handleOpenMenu" />
  <app-sidebar
    :menu-is-open="menuIsOpen"
    @close="handleOpenMenu(false)"
    @select-category="handleFilterBycategory"
  />
  <div class="px-3 py-4 container mx-auto">
    <slot></slot>
  </div>
  <app-footer />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useRouter } from 'vue-router';

import { CategoryEnum, CategoryToTagEnum } from '@/enums';

import { AppHeader, AppSidebar, AppFooter } from './components';

const router = useRouter();

const menuIsOpen = ref(false);

function handleOpenMenu(open: boolean): void {
  menuIsOpen.value = open;
}

function handleFilterBycategory(category: CategoryEnum) {
  const categoryTag = CategoryToTagEnum[category];

  menuIsOpen.value = false;
  router.push(`/${categoryTag}/products`);
}
</script>

<script lang="ts">
export default {
  name: 'AppLayout',
};
</script>
