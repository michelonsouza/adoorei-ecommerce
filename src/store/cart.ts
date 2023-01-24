import { ref, computed } from 'vue';

import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';

import { Cart, CartProduct } from '@/models';
import { encryptStorage } from '@/utils';

const STORE_STORAGE_KEY = 'store:cart';
const initialCartValue: Cart = {
  date: new Date().toISOString(),
  id: 1,
  products: [],
  userId: 1,
  __v: 0,
};

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart>(
    encryptStorage.getItem<Cart>(STORE_STORAGE_KEY) || initialCartValue,
  );

  const quantity = computed(() => {
    return cart.value.products.length;
  });

  function addProduct(product: CartProduct): void {
    const cartProducts = cloneDeep(cart.value.products);
    const productExists = cartProducts.find(
      cartProduct => cartProduct.productId === product.productId,
    );

    if (!productExists) {
      cartProducts.push(product);
    }

    const newCartProducts = cartProducts.map(cartProduct => {
      if (cartProduct.productId === product.productId && !!productExists) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity + product.quantity,
        };
      }

      return cartProduct;
    });
    const internCart: Cart = { ...cart.value, products: newCartProducts };
    cart.value = internCart;
    encryptStorage.setItem(STORE_STORAGE_KEY, internCart);
  }

  function subProduct(product: CartProduct): void {
    let cartProducts = cloneDeep(cart.value.products);
    const productExists = cartProducts.find(
      cartProduct => cartProduct.productId === product.productId,
    );

    if (productExists && productExists.quantity === 1) {
      cartProducts = cartProducts.filter(
        cartProduct => cartProduct.productId !== product.productId,
      );
    }

    const newCartProducts = cartProducts
      .map(cartProduct => {
        if (cartProduct.productId === product.productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - product.quantity,
          };
        }

        return cartProduct;
      })
      .filter(cartProduct => !!cartProduct.quantity);
    const internCart: Cart = { ...cart.value, products: newCartProducts };
    cart.value = internCart;
    encryptStorage.setItem(STORE_STORAGE_KEY, internCart);
  }

  return { cart, addProduct, subProduct, quantity };
});
