<template>
  <div>
    <app-layout>
      <router-view v-slot="{ Component, route }">
        <transition name="page-slide" mode="out-in">
          <div :key="route.path">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </app-layout>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { AppLayout } from '@/layouts';
</script>

<style scoped>
.page-slide-enter-active,
.page-slide-leave-active {
  transition: 300ms ease all;
}

.page-slide-enter-from,
.page-slide-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
