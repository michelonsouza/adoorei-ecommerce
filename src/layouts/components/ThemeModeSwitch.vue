<template>
  <Switch
    :class="enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-500'"
    class="relative inline-flex h-6 w-11 items-center rounded-full transition-all"
    :title="switchTitle"
    @click="handleChangeTheme"
  >
    <span class="sr-only">Change Theme Mode</span>
    <span
      :class="enabled ? 'translate-x-6' : 'translate-x-1'"
      class="inline-block h-4 w-4 transform rounded-full bg-white transition"
    />
  </Switch>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import { Switch } from '@headlessui/vue';

type ThemeType = 'light' | 'dark';
let mode: ThemeType = (localStorage.getItem('theme') as ThemeType) || 'light';

const enabled = ref(mode === 'dark');

const switchTitle = computed(() => {
  const themeName = enabled.value ? 'claro' : 'escuro';

  return `Trocar para tema ${themeName}`;
});

function setThemeAttributes() {
  if (mode === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.removeAttribute('data-mode');
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-mode', 'dark');
  }

  localStorage.setItem('theme', mode);
}

function handleChangeTheme() {
  enabled.value = !enabled.value;
  mode = enabled.value ? 'dark' : 'light';

  setThemeAttributes();
}

onMounted(setThemeAttributes);
</script>

<script lang="ts">
export default {
  name: 'ThemeModeSwitch',
};
</script>
