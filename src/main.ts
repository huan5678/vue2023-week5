import {createApp} from 'vue';
import {createPinia} from 'pinia';
import '@/assets/index.css';

import App from './App.vue';
import router from './router';
import '@/validation';
const app = createApp(App as any);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');
