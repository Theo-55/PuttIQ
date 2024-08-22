import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { IonicVue } from '@ionic/vue';
import { createPinia } from 'pinia';


import router from './router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

//icons
import 'ionicons/icons';

//tailwind
import './assets/tailwind.css';


const pinia = createPinia();

createApp(App).use(IonicVue).use(router).use(pinia).mount('#app')
