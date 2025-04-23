<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useStoreStore } from '@/stores/store'
const hostname = window.location.hostname
const hostParts = hostname.split('.')

const storeStore = useStoreStore()

onMounted(async () => {
  let subdomain = ''
  if (hostParts.length > 2) {
    subdomain = hostParts[0].toLowerCase()
  }
  
  if (subdomain && subdomain !== 'admin') {
    await storeStore.getStoreBySubdomain(subdomain)
  }
})
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
