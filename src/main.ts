import { createApp } from 'vue';

import './index.css';
import App from './App.vue';
import { router } from './router';
import { pinia } from './store';

export const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
