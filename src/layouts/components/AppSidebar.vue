<template>
  <TransitionRoot
    key="overlay-container"
    :show="menuIsOpen"
    enter="transition-opacity duration-75"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition-opacity duration-300"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div
      class="fixed w-full overflow-hidden h-[100vh] top-0 left-0 z-10 bg-gray-900 dark:bg-white bg-opacity-50 dark:bg-opacity-50"
      role="presentation"
      @click="emits('close')"
    ></div>
  </TransitionRoot>
  <div
    class="overflow-hidden p-4 w-52 z-20 m-w-52 h-[100vh] shadow-lg fixed top-0 bg-terciary text-white transition-all duration-300"
    :class="sidebarClasses"
  >
    <img
      role="presentation"
      :src="shortLogo"
      class="w-8 h-8 ml-4 cursor-pointer min-[640px]:hidden mb-4"
      title="Home"
      @click="handleGoToHome"
    />
    <menu-container
      :open="true"
      data-headlessui-state="open"
      as="div"
      class="w-full max-w-full"
    >
      <menu-items
        static
        class="w-full min-w-full rounded-md bg-terciary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <menu-item
          v-for="category in categoriesMapped"
          :key="category.componentKey"
          v-slot="{ active }"
          class="mb-2"
          @click="emits('select-category', category.key as CategoryEnum)"
        >
          <button
            :class="[
              active ? 'bg-white text-gray-900' : 'text-white',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
            ]"
          >
            <component
              :is="category.CategoryIcon"
              :active="active"
              class="mr-2 h-4 w-"
              :class="[active ? 'text-gray-900' : 'text-white']"
              aria-hidden="true"
              size
            />
            {{ category.key }}
          </button>
        </menu-item>
      </menu-items>
    </menu-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue';

import {
  TransitionRoot,
  Menu as MenuContainer,
  MenuItems,
  MenuItem,
} from '@headlessui/vue';
import { useRouter } from 'vue-router';

import shortLogo from '@/assets/images/short-logo.png';
import type { CategoryEnum } from '@/enums';
import { categories } from '@/mocks';

interface AppSidebarProps {
  menuIsOpen: boolean;
}

type EmitTypes = {
  (event: 'close'): void;
  (event: 'select-category', category: CategoryEnum): void;
};

const router = useRouter();
const props = defineProps<AppSidebarProps>();
const emits = defineEmits<EmitTypes>();

const sidebarClasses = computed(() => ({
  'left-[-100%]': !props.menuIsOpen,
  'left-0': props.menuIsOpen,
}));

const categoriesMapped = computed(() => {
  return Object.entries(categories).map(([key, value], index) => ({
    key,
    CategoryIcon: value,
    componentKey: `key-${index}`,
  }));
});

function handleGoToHome() {
  emits('close');
  router.push('/');
}

onMounted(() => {
  window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      emits('close');
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('keyup', event => {
    if (event.key === 'Escape') {
      emits('close');
    }
  });
});
</script>

<script lang="ts">
export default {
  name: 'AppSidebar',
};
</script>
