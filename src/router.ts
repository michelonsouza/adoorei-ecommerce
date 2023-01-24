import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import { HomePage } from './pages';

const CartPage = () => import('./pages/CartPage.vue');
const CategoryProductPage = () => import('./pages/CategoryProductPage.vue');
const ProductPage = () => import('./pages/ProductPage.vue');

const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', component: HomePage },
  { path: '/cart', component: CartPage },
  { path: '/:category/products', component: CategoryProductPage },
  { path: '/product/:id', component: ProductPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
