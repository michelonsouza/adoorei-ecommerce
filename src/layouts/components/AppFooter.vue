<template>
  <footer class="flex justify-center dark:shadow-gray-700 mt-5">
    <div class="container h-full flex py-6 items-center justify-center">
      <p class="font-bold dark:text-primary">ADOOREI &copy;{{ year }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<script lang="ts">
export default {
  name: 'AppFooter',
};
</script>
