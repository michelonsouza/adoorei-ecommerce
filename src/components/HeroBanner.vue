<template>
  <div
    class="w-full relative rounded-lg h-64 p-4 flex align-top bg-cover bg-no-repeat bg-center after:w-full after:h-full after:absolute after:z-10 after:top-0 after:left-0"
    :style="{ 'background-image': `url(${bannerImg})` }"
  >
    <h1 class="text-4xl text-white">adoorei</h1>
  </div>
</template>

<script setup lang="ts">
import bannerImg from '@/assets/images/clark-street-mercantile-unsplash.jpeg';
</script>

<script lang="ts">
export default {
  name: 'HeroBanner',
};
</script>
