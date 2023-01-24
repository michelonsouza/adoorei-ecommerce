<template>
  <div
    v-show="!!props?.product"
    class="flex flex-col sm:flex-row items-start border-b dark:border-b-0 pb-4 gap-8 dark:bg-gray-400 dark:rounded dark:p-2"
  >
    <img
      :src="props?.product?.image"
      :alt="props?.product?.title"
      class="w-auto h-40 mix-blend-multiply"
    />
    <div class="flex flex-col gap-2 h-full items-baseline">
      <h1 class="font-medium text-xl">
        {{ props?.product?.title }}
      </h1>
      <h1 class="font-medium text-xl">Subtotal: {{ productSubTotal }}</h1>
      <div
        class="flex items-center justify-between sm:justify-start sm:gap-8 w-full mt-2"
      >
        <div class="flex items-center">
          <button
            :disabled="cartProduct.quantity === 1"
            class="w-10 h-10 sm:w-6 sm:h-6 rounded bg-primary text-white flex justify-center items-center"
            :class="[
              cartProduct.quantity === 1
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
            :value="cartProduct.quantity"
          />
          <button
            class="w-10 h-10 sm:w-6 sm:h-6 rounded bg-primary text-white flex justify-center items-center"
            @click="handleAddQuantity"
          >
            +
          </button>
        </div>
        <button
          class="w-10 h-10 sm:w-6 sm:h-6 rounded bg-red-600 text-white flex justify-center items-center"
          @click="handleRemoveProduct"
        >
          <trash-icon class="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { TrashIcon } from '@heroicons/vue/24/solid';

import type { Product, CartProduct } from '@/models';
import { formatToMonetary } from '@/utils';

interface CartProductProps {
  product?: Product;
  cartProduct: CartProduct;
}

type EmitTypes = {
  (event: 'sub-item-quantity', product: CartProduct): void;
  (event: 'add-item-quantity', product: CartProduct): void;
  (event: 'remove-product', product: CartProduct): void;
};

const props = defineProps<CartProductProps>();
const emits = defineEmits<EmitTypes>();

const productSubTotal = computed(() => {
  if (!props.product) {
    return formatToMonetary(0);
  }

  const productSubTotalValue = props.product.price * props.cartProduct.quantity;

  return formatToMonetary(productSubTotalValue);
});

function handleSubQuantity() {
  emits('sub-item-quantity', { ...props.cartProduct, quantity: 1 });
}

function handleAddQuantity() {
  emits('add-item-quantity', { ...props.cartProduct, quantity: 1 });
}

function handleRemoveProduct() {
  emits('remove-product', props.cartProduct);
}
</script>

<script lang="ts">
export default {
  name: 'CartProductItem',
};
</script>
