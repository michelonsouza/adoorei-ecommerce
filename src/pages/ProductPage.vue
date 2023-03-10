<template>
  <div v-if="!product">
    <h1>Produto não encontrado</h1>
  </div>
  <div
    v-else
    class="flex items-center sm:items-start gap-2 sm:gap-8 flex-col sm:flex-row"
  >
    <div class="dark:bg-gray-400 rounded p-2">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-44 sm:w-96 h-auto mix-blend-multiply"
      />
    </div>
    <div class="flex flex-col gap-2 items-baseline">
      <h1 class="text-3xl">{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p>
        Category: <b>{{ product.category }}</b>
      </p>
      <div class="flex items-center gap-1 mt-2">
        <star-icon class="w-4 h-4 text-yellow-400" />
        <span class="block">{{ product.rating.rate }}</span>
        <user-icon class="w-4 h-4 text-blue-500 ml-4" />
        <span class="block">{{ product.rating.count }}</span>
      </div>
      <div class="flex items-center justify-between mt-3 w-full">
        <p class="font-semibold text-2xl">{{ price }}</p>
        <div class="flex items-center gap-4 mt-2">
          <div class="flex items-center">
            <button
              :disabled="quantity === 1"
              class="w-10 h-10 sm:w-8 sm:h-8 rounded bg-primary text-white flex justify-center items-center"
              :class="[
                quantity === 1 ? 'bg-gray-300 dark:bg-gray-500' : 'bg-primary',
              ]"
              @click="quantity -= 1"
            >
              -
            </button>
            <input
              readonly
              class="rounded bg-transparent w-16 sm:w-12 h-10 sm:h-8 border text-center"
              :value="quantity"
            />
            <button
              class="w-10 h-10 sm:w-8 sm:h-8 rounded bg-primary text-white flex justify-center items-center"
              @click="quantity += 1"
            >
              +
            </button>
          </div>
          <button
            class="bg-accent sm:h-8 dark:bg-accent-dark text-white h-10 px-2 rounded"
            @click="handleAddToCart"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { StarIcon, UserIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router';

import type { CartProduct } from '@/models';
import { useProductStore, useCartStore } from '@/store';
import { formatToMonetary } from '@/utils';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const quantity = ref<number>(1);

const price = computed<string>(() =>
  formatToMonetary(product.value?.price || 0),
);

const product = computed(() => {
  return productStore.products.find(
    storeProduct => storeProduct.id === Number(route.params.id),
  );
});

function handleAddToCart(event: MouseEvent) {
  event.stopPropagation();

  const addCartProduct: CartProduct = {
    quantity: quantity.value,
    productId: Number(route.params.id),
  };

  cartStore.addProduct(addCartProduct);
  quantity.value = 1;
}
</script>

<script lang="ts">
export default {
  name: 'ProductPage',
};
</script>
