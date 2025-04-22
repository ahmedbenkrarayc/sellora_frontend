<template>
    <div class="font-sans antialiased bg-sellora-pearl min-h-screen overflow-x-hidden">
      <Toast ref="toastRef" />
      <div class="fixed -left-32 -top-32 w-64 h-64 rounded-full bg-sellora-primary/10 blur-3xl animate-float"></div>
      <div class="fixed right-0 bottom-0 w-96 h-96 rounded-full bg-sellora-accent/10 blur-3xl animate-float animation-delay-2000"></div>
      
      <div class="container mx-auto px-4 py-12 relative z-10">
        <div class="flex justify-between items-center mb-16">
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-sellora-accent mr-3 animate-pulse-slow"></div>
            <span class="text-2xl font-bold text-gray-900">Sellora</span>
          </div>
          <div class="text-gray-700 font-medium">
            Welcome, <span class="text-sellora-primary">{{ authStore.user.fname }}</span>
          </div>
        </div>
        
        <div class="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div class="lg:w-1/2">
            <div class="relative max-w-lg">
              <div class="absolute -z-10 -top-20 -left-20 w-64 h-64 rounded-full bg-sellora-primary/10 blur-2xl"></div>
              
              <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-6">
                <span class="text-sellora-primary">Launch</span><br>
                <span class="text-gray-900">Your Fashion Store</span>
              </h1>
              
              <p class="text-xl text-gray-600 mb-10 max-w-md">
                Create your exclusive fashion boutique on Sellora's premium marketplace.
              </p>
              
              <div class="grid grid-cols-2 gap-6 mb-16">
                <div class="glass-card p-6 rounded-2xl border border-white shadow-sm hover:shadow-md transition">
                  <div class="w-12 h-12 rounded-xl bg-sellora-cream flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sellora-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 class="font-bold text-gray-900 mb-2">Instant Setup</h3>
                  <p class="text-gray-600 text-sm">Ready to sell in minutes</p>
                </div>
                
                <div class="glass-card p-6 rounded-2xl border border-white shadow-sm hover:shadow-md transition">
                  <div class="w-12 h-12 rounded-xl bg-sellora-cream flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sellora-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 class="font-bold text-gray-900 mb-2">Secure Platform</h3>
                  <p class="text-gray-600 text-sm">Bank-level protection</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="lg:w-1/2 w-full">
            <div class="glass-card p-8 sm:p-10 rounded-3xl border border-white shadow-xl max-w-lg mx-auto">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">Create Your Store</h2>
              <p class="text-gray-500 mb-8">Set up your fashion boutique in just a few steps</p>
              
              <form @submit.prevent="submitForm" class="space-y-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Store Name</label>
                  <div class="relative">
                    <input 
                      v-model="storeName"
                      type="text" 
                      class="bg-white w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-sellora-primary focus:ring-2 focus:ring-sellora-primary/10 transition placeholder-gray-400" 
                      placeholder="e.g. Luxe Couture"
                      required
                    >
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Store URL</label>
                  <div class="flex">
                    <input 
                      v-model="storeUrl"
                      type="text" 
                      class="bg-white flex-grow px-5 py-3.5 rounded-l-xl border border-gray-200 focus:border-sellora-primary focus:ring-2 focus:ring-sellora-primary/10 transition placeholder-gray-400" 
                      placeholder="yourbrand"
                      required
                    >
                    <span class="inline-flex items-center px-4 bg-gray-50 border-t border-b border-r border-gray-200 text-gray-600 rounded-r-xl">.sellora.local</span>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Store Logo</label>
                  <div class="flex items-center space-x-5">
                    <label for="logo-upload" class="relative group cursor-pointer">
                      <div id="logo-preview" class="logo-preview w-20 h-20 rounded-xl bg-gradient-to-br from-sellora-pearl to-white border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                        <template v-if="!logoPreview">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 group-hover:text-sellora-primary transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </template>
                        <img v-else :src="logoPreview" class="w-full h-full object-cover" alt="Logo Preview">
                      </div>
                      <input 
                        id="logo-upload" 
                        type="file" 
                        accept="image/*" 
                        class="hidden"
                        @change="handleLogoUpload"
                      >
                    </label>
                    <div>
                      <label for="logo-upload" class="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sellora-primary/20 focus:border-sellora-primary transition shadow-sm cursor-pointer inline-block">
                        Choose File
                      </label>
                      <p class="text-xs text-gray-500 mt-2">PNG, JPG or SVG (Max 5MB)</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">Store Category</label>
                  <div class="grid grid-cols-2 gap-3">
                    <label 
                      v-for="category in categories" 
                      :key="category.id"
                      class="relative"
                    >
                      <input 
                        type="radio" 
                        name="category" 
                        class="sr-only peer" 
                        :checked="category.id === selectedCategory"
                        :disabled="category.disabled"
                        @change="selectedCategory = category.id"
                      >
                      <div 
                        class="category-card p-4 border-2 rounded-xl shadow-sm"
                        :class="{
                          'border-sellora-primary bg-sellora-primary/5': category.id === selectedCategory,
                          'border-gray-200': category.id !== selectedCategory,
                          'disabled opacity-60 cursor-not-allowed': category.disabled
                        }"
                      >
                        <div class="flex flex-col items-center text-center">
                          <div 
                            class="w-12 h-12 rounded-lg flex items-center justify-center mb-3 text-2xl"
                            :class="category.id === selectedCategory ? 'bg-sellora-cream' : 'bg-gray-100'"
                          >
                            {{ category.emoji }}
                          </div>
                          <span class="text-sm font-medium">{{ category.name }}</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Store Description</label>
                  <textarea 
                    v-model="storeDescription"
                    rows="3" 
                    class="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-sellora-primary focus:ring-2 focus:ring-sellora-primary/10 transition placeholder-gray-400" 
                    placeholder="Tell us about your fashion brand..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  class="w-full py-4 px-6 bg-gradient-to-r from-sellora-primary to-sellora-light text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sellora-primary/30"
                >
                  Create Fashion Store
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline ml-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import Toast from 'primevue/toast'
import { useAuthStore } from '@/stores/auth/storeowner/auth'
import { useStoreStore } from '@/stores/store'
const toastRef = ref()

const authStore = useAuthStore()
const storeStore = useStoreStore()

const storeName = ref('')
const storeUrl = ref('')
const logoPreview = ref(null)
const selectedCategory = ref('fashion')
const storeDescription = ref('')

const categories = [
  { id: 'fashion', name: 'Fashion', emoji: '👗', disabled: false },
  { id: 'electronics', name: 'Electronics', emoji: '📱', disabled: true },
  { id: 'home', name: 'Home', emoji: '🏠', disabled: true },
  { id: 'food', name: 'Food', emoji: '🍽️', disabled: true }
]

function showToast(type, summary, detail) {
  toastRef.value.add({
    severity: type,
    summary,
    detail,
    life: 3000
  })
}

const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      logoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const submitForm = async () => {
  const formData = {
    storeName: storeName.value,
    storeUrl: storeUrl.value,
    logo: logoPreview.value,
    category: selectedCategory.value,
    description: storeDescription.value,
    storeOwnerId: authStore.user.id 
  }

  await storeStore.createStore(formData)
  if(storeStore.error){
    if(typeof storeStore.error === 'object'){
        for (const field in storeStore.error) {
            storeStore.error[field].forEach(message => {
                showToast('error', 'Form error', message)
            })
        }
    }else{
        showToast('error', 'Error', storeStore.error)
    }
  }else{
    //success
  }
}
</script>

  
<style scoped>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  @layer components {
    .glass-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
  }
  
  @layer utilities {
    input:focus, textarea:focus {
      outline: none !important;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .logo-preview {
      transition: all 0.3s ease;
    }
    
    .logo-preview:hover {
      transform: scale(1.05);
    }
    
    .category-card {
      transition: all 0.2s ease;
    }
    
    .category-card:not(.disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);
    }
    
    .disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>