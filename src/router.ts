import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import { HomePage } from './pages';

const ProductPage = () => import('./pages/ProductPage.vue');
const CategoryProductPage = () => import('./pages/CategoryProductPage.vue');

const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', component: HomePage },
  { path: '/:category/products', component: CategoryProductPage },
  { path: '/product/:id', component: ProductPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
