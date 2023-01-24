<template>
  <div
    class="rounded flex flex-col items-center justify-center shadow-lg max-w-xl overflow-hidden p-4 dark:bg-gray-400 hover:border-primary border-2 border-transparent transition cursor-pointer"
    role="presentation"
    :data-product-id="props.product.id"
    @click="handleProductDetails"
  >
    <img
      class="w-auto h-40 mix-blend-multiply"
      :src="product.image"
      :alt="product.title"
    />
    <div class="flex flex-col justify-between h-full w-full">
      <h1 class="text-xl text-center mt-2">{{ product.title }}</h1>
      <div class="flex flex-col">
        <div class="flex items-center gap-1 mt-2">
          <star-icon class="w-4 h-4 text-yellow-400" />
          <span class="block">{{ product.rating.rate }}</span>
          <user-icon class="w-4 h-4 text-blue-500 ml-4" />
          <span class="block">{{ product.rating.count }}</span>
        </div>
        <p class="font-semibold text-2xl">{{ price }}</p>
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center">
            <button
              :disabled="productQuantity === 1"
              class="w-10 h-10 sm:w-6 sm:h-6 rounded bg-primary text-white flex justify-center items-center"
              :class="[
                productQuantity === 1
                  ? 'bg-gray-300 dark:bg-gray-500'
                  : 'bg-primary',
              ]"
              @click="handleSubQuantity"
            >
              -
            </button>
            <input
              readonly
              class="rounded bg-transparent w-14 sm:w-10 border text-center h-10 sm:h-6"
              :value="productQuantity"
            />
            <button
              class="w-10 h-10 sm:w-6 sm:h-6 rounded bg-primary text-white flex justify-center items-center"
              @click="handleAddQuantity"
            >
              +
            </button>
          </div>
          <button
            class="bg-accent dark:bg-accent-dark text-white h-10 sm:h-6 px-2 rounded"
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
import { ref } from 'vue';

import { StarIcon, UserIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

import type { Product, CartProduct } from '@/models';
import { useCartStore } from '@/store';
import { formatToMonetary } from '@/utils';

interface ProductCardProps {
  product: Product;
}

const router = useRouter();
const store = useCartStore();

const props = defineProps<ProductCardProps>();

const price = ref<string>(formatToMonetary(props.product.price));

const productQuantity = ref<number>(1);

function handleSubQuantity(event: MouseEvent) {
  event.stopPropagation();
  productQuantity.value -= 1;
}

function handleAddQuantity(event: MouseEvent) {
  event.stopPropagation();
  productQuantity.value += 1;
}

function handleAddToCart(event: MouseEvent) {
  event.stopPropagation();

  const addCartProduct: CartProduct = {
    quantity: productQuantity.value,
    productId: props.product.id,
  };

  store.addProduct(addCartProduct);
  productQuantity.value = 1;
}

function handleProductDetails() {
  router.push({
    path: `/product/${props.product.id}`,
  });
}
</script>

<script lang="ts">
export default {
  name: 'ProductCard',
};
</script>
