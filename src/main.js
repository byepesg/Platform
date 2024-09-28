import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
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
// Fetch abilities on app initialization
import { useAbilityStore } from '@/stores/abilities';
import { AbilityBuilder } from '@casl/ability';
const initializeAbilities = async () => {
    console.log('Initializing abilities');
    const abilityStore = useAbilityStore();
    const { can, rules } = new AbilityBuilder();
    const token = sessionStorage.getItem('accessSessionToken');
    if (!token) {
        return
    } else {
        console.log('Fetching abilities');
        await abilityStore.fetchAbilities();
        const abilities = abilityStore.getAbilities;
       const { can, cannot, rules } = new AbilityBuilder();
       abilities.forEach(({ action, subject }) => {
       can(action, subject); 
   });
       ability.update(rules);
    }
};

initializeAbilities(); 
/////////////////////////////////////////////////////////////////
//Language package using
app.use(i18n);

/////////////////////////////////////////////////////////////////
app.mount('#app');
