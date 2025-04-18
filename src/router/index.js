import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from './routes/admin'
import landingRoutes from './routes/landing'
import storeRoutes from './routes/store'

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

export default router
