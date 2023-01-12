<template>
  <div>
    <router-link to="/">HomePage</router-link>
    <router-link to="/test">TestPage</router-link>
    <!-- <a href="https://vitejs.dev" target="_blank" aria-label="vite logo">
      <img id="logo" src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a> -->
  </div>
  <HelloWorld msg="Vite + Vue" />
  <router-view></router-view>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';

import HelloWorld from './components/HelloWorld.vue';
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
