import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import App from './App.vue'
import router from './router'

async function validateAndMount() {
  const hostname = window.location.hostname
  const hostParts = hostname.split('.')

  let subdomain = ''
  if (hostParts.length > 2) {
    subdomain = hostParts[0].toLowerCase()
  }

  if (subdomain && subdomain !== 'admin'){
    //validation will be added here
  }

  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
  });
  app.mount('#app')
}

validateAndMount()
