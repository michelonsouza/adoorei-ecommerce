import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import { HomePage, TestPage } from './pages';

const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', component: HomePage },
  { path: '/test', component: TestPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
