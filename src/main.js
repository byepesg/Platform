import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';

import { messages } from '@/locales/lang.js';
import { createI18n } from 'vue-i18n';

//Lenguaje por defecto
const userLocale = navigator.language || navigator.userLanguage;
const defaultLocale = userLocale.startsWith('es') ? 'es' : 'en';
localStorage.setItem('locale', defaultLocale);
const savedLocale = localStorage.getItem('locale');

const i18n = createI18n({
    
    legacy: false, // disable legacy mode because of vue 3
    locale: savedLocale,
    fallbackLocale: 'en',
    messages
})
const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);
app.use(i18n);

app.mount('#app');
