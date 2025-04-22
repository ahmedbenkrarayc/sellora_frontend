<template>
  <div class="bg-[#F7F7F7] font-poppins flex flex-col h-screen overflow-hidden m-0 p-0">
    <Header @toggle-menu="toggleMobileMenu" />
    <MobileMenu :is-open="isMenuOpen" @close="toggleMobileMenu" />
  
    <main class="flex flex-1 overflow-hidden">
      <SideBar />
  
      <router-view />
    </main>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
import Header from '@/components/storeowner/layout/Header.vue'
import MobileMenu from '@/components/storeowner/layout/MobileMenu.vue'
import SideBar from '@/components/storeowner/layout/SideBar.vue'

const isMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.classList.toggle('overflow-hidden', isMenuOpen.value)
}
</script>
  
<style scoped>

</style>
  