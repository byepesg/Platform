import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';
/////////////////////////////////////////////////////////////////
//Abilities
import ability from '@/service/ability.js';
import { abilitiesPlugin } from '@casl/vue';
/////////////////////////////////////////////////////////////////
//i18n for language package
import { messages } from '@/locales/lang.js';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
//Lenguaje por defecto
const userLocale = navigator.language || navigator.userLanguage;
const defaultLocale = userLocale.startsWith('es') ? 'es' : 'en';
localStorage.setItem('locale', defaultLocale);
const savedLocale = localStorage.getItem('locale');
////////////////////////////////////////////
//Pinia
const pinia = createPinia()

///////////////////////////////////////////
////
const i18n = createI18n(
    {
    legacy: false, // disable legacy mode because of vue 3
    locale: savedLocale,
    fallbackLocale: 'en',
    messages
    }
    )
/////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////

app.use(pinia)
////////////////////////////////////////////
app.use(abilitiesPlugin, ability, { useGlobalProperties: true });
app.provide('ability', ability);

/////////////////////////////////////////////////////////////////
//Language package using
app.use(i18n);

/////////////////////////////////////////////////////////////////
app.mount('#app');
