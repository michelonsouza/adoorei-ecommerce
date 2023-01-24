<template>
  <header
    class="sticky top-0 z-10 flex items-center shadow-md dark:shadow-gray-700 bg-gray-100 dark:bg-gray-900 h-12 w-full px-4 py-8"
  >
    <div class="container flex items-center justify-between mx-auto">
      <div class="flex items-center">
        <button
          class="p-2 rounded bg-transparent text-gray-900 dark:text-white hover:bg-primary hover:text-white transition-colors"
          @click="handleOpenMenu"
        >
          <bars-3-icon class="h-6 w-6" />
        </button>
        <img
          role="presentation"
          :src="shortLogo"
          class="w-8 h-8 ml-4 cursor-pointer hidden min-[640px]:block"
          title="Home"
          @click="handleGoToHome"
        />
      </div>
      <div class="flex items-center gap-3">
        <search-input />
        <theme-mode-switch />
        <button
          class="p-2 rounded bg-transparent relative text-gray-900 dark:text-white hover:bg-primary hover:text-white transition-colors"
          :class="{
            'cursor-not-allowed hover:bg-transparent hover:text-gray-900':
              !store.quantity,
          }"
          :disabled="!store.quantity"
          @click="handleOpenMenu"
        >
          <shopping-cart-icon class="h-6 w-6" />
          <span
            v-if="store.quantity"
            class="w-5 h-5 min-w-min min-h-min absolute top-[-4px] right-[-4px] rounded-full flex items-center justify-center bg-primary text-white"
            >{{ store.quantity }}</span
          >
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { Bars3Icon, ShoppingCartIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

import shortLogo from '@/assets/images/short-logo.png';
import { SearchInput } from '@/components';
import { useCartStore } from '@/store';

import ThemeModeSwitch from './ThemeModeSwitch.vue';

interface AppHeaderProps {
  open?: boolean;
}

type EmitTypes = {
  (event: 'menu-open', value: boolean): void;
};

const router = useRouter();
const store = useCartStore();
const emits = defineEmits<EmitTypes>();
const props = defineProps<AppHeaderProps>();

const menuOpen = ref(!!props.open);

const menuIsOpen = computed(() => {
  if (props.open !== undefined) {
    return props.open;
  }

  return menuOpen.value;
});

function handleOpenMenu() {
  menuOpen.value = !menuIsOpen.value;
  emits('menu-open', menuOpen.value);
}

function handleGoToHome() {
  router.push('/');
}
</script>

<script lang="ts">
export default {
  name: 'AppHeader',
};
</script>
