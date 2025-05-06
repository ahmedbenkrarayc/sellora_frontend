import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth/storeowner/auth'
import { useStoreStore } from '@/stores/store'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

async function validateSubdomain() {
  const hostname = window.location.hostname
  const hostParts = hostname.split('.')

  let subdomain = ''
  if (hostParts.length > 2) {
    subdomain = hostParts[0].toLowerCase()
  }

  if (subdomain && subdomain !== 'admin') {
    const app = createApp({})
    const pinia = createPinia()
    app.use(pinia)

    const store = useStoreStore(pinia)
    await store.getStoreBySubdomain(subdomain)

    if (!store.storeData) {
      window.location.href = 'http://websitedoesntexist.com'
      return false
    }else if(!store.storeData.is_active){
      window.location.href = 'http://websitedoesntexist.com'
      return false
    }
  }

  return true
}

async function bootstrap() {
  const isValid = await validateSubdomain()
  if (!isValid) return

  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)

  const auth = useAuthStore(pinia)
  try {
    await auth.getUser()
  } catch (e) {
    auth.setUser(null)
  }

  window.Pusher = Pusher

  window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_KEY, 
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: 6001,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
  })

  app.use(router)
  app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })

  app.mount('#app')
}

bootstrap()
