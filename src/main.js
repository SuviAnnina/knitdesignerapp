import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';

const app = createApp(App);
app.use(PrimeVue);
app.directive('tooltip', Tooltip);

app.mount('#app');