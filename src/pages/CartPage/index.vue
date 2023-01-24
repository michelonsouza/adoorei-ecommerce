<template>
  <h1 class="font-medium text-2xl mb-4">Cart</h1>
  <div v-if="!!cartStore.quantity">
    <div class="flex flex-col gap-4">
      <cart-product-item
        v-for="cartProduct in cartStore.cart.products"
        :key="cartProduct.productId"
        :cart-product="cartProduct"
        :product="getFullProduct(cartProduct)"
        @add-item-quantity="cartStore.addProduct"
        @sub-item-quantity="cartStore.subProduct"
        @remove-product="cartStore.removeProduct"
      />
      <p class="font-bold text-3xl text-end">Total: {{ cartTotal }}</p>
      <div class="flex justify-end items-center mt-2">
        <button
          class="bg-accent text-white p-2 rounded"
          @click="userModalIsOpen = true"
        >
          Finish checkout
        </button>
      </div>
    </div>
  </div>
  <no-products v-else />
  <user-details-modal
    :open="userModalIsOpen"
    @close="userModalIsOpen = false"
    @success="handleSuccess"
  />
  <success-modal
    :open="successModalIsOpen"
    @close="successModalIsOpen = false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import type { CartProduct, Product } from '@/models';
import { useCartStore, useProductStore } from '@/store';
import { formatToMonetary } from '@/utils';

import {
  CartProductItem,
  NoProducts,
  UserDetailsModal,
  SuccessModal,
} from './components';

const cartStore = useCartStore();
const productStore = useProductStore();

const userModalIsOpen = ref<boolean>(false);
const successModalIsOpen = ref<boolean>(false);

const cartTotal = computed(() => {
  const productsTotalValue = cartStore.cart.products.reduce(
    (accumulator: number, product) => {
      const productInProducts: Product | undefined = productStore.products.find(
        productInStore => productInStore.id === product.productId,
      );

      if (productInProducts) {
        return accumulator + productInProducts.price * product.quantity;
      }

      return accumulator;
    },
    0,
  );

  return formatToMonetary(productsTotalValue);
});

function handleSuccess() {
  userModalIsOpen.value = false;
  successModalIsOpen.value = true;
}

function getFullProduct(cartProduct: CartProduct): Product | undefined {
  return productStore.products.find(
    product => product.id === cartProduct.productId,
  );
}
</script>

<script lang="ts">
export default {
  name: 'CartPage',
};
</script>
