import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from './routes/admin'
import landingRoutes from './routes/landing'
import storeRoutes from './routes/store'
import { useAuthGuardStore } from '@/stores/authguard'

const hostname = window.location.hostname
const hostParts = hostname.split('.')

let subdomain = ''
if(hostParts.length > 2){
  subdomain = hostParts[0].toLowerCase()
}

let activeRoutes = []

if(subdomain === 'admin'){
  activeRoutes = adminRoutes
}else if(!subdomain){
  activeRoutes = landingRoutes
}else{
  activeRoutes = storeRoutes
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: activeRoutes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthGuardStore()

  await authStore.checkAuth()

  if (authStore.isLoading) {
    return
  }

  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.userRole

  //requires auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    window.location.href = 'http://sellora.local:5173/login'
    return
  }

  //requires guest
  if (to.meta.requiresGuest && isAuthenticated) {
    window.location.href = 'http://sellora.local:5173'
    return
  }

  //check role
  if (to.meta.requiresRole && to.meta.requiresRole !== userRole) {
    return next({ path: '/403' })
  }

  next()
})

export default router
