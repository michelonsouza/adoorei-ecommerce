<template>
  <div class="h-[80vh] flex flex-col items-center gap-4">
    <h1 class="font-medium text-4xl">Empty Cart</h1>
    <face-frown-icon class="w-24 h-24" />
    <router-link to="/" class="bg-accent p-2 rounded text-white">
      Click here to go home
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { FaceFrownIcon } from '@heroicons/vue/24/solid';
import { RouterLink } from 'vue-router';
</script>

<script lang="ts">
export default {
  name: 'NoProducts',
};
</script>
