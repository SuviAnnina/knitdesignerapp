import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import 'primeicons/primeicons.css';

//createApp(App).mount('#app')

const app = createApp(App);
app.use(PrimeVue);
app.mount('#app');