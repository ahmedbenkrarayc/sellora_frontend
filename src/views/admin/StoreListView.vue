<template>
    <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
      <WelcomeMessage description="Manage your stores efficiently" />
      <div class="my-8 px-4 sm:px-0">
        <div class="flex items-center gap-2 bg-white px-4 py-2 w-full sm:w-fit sm:ml-auto rounded-md border-2 border-[#D3D3D3] max-w-full sm:max-w-[250px] mx-auto sm:mx-0">
          <img class="w-4 h-4" src="@/assets/images/search.svg" alt="search icon">
          <input 
            v-model="searchQuery"
            @input="filterStores"
            class="flex-1 text-[15px] outline-none bg-transparent placeholder-gray-400"
            type="text" 
            placeholder="Search..." />
        </div>
      </div>
      
      <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
        <div v-if="loading" class="text-center py-8">Loading stores...</div>
        <div v-else-if="filteredStores.length === 0" class="text-center py-8 text-gray-500">
          No stores found
        </div>
  
        <template v-else>
          <div 
            v-for="store in paginatedStores"
            :key="store.id"
            class="bg-white rounded-lg shadow-sm mb-4 p-4"
          >
            <div class="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left md:space-x-6 space-y-4 md:space-y-0">
              
              <div class="flex flex-col items-center md:flex-row md:items-center md:gap-4 gap-2">
                <img 
                  v-if="store.logo" 
                  :src="store.logo" 
                  class="size-12 block rounded-full object-cover" 
                  alt="store logo"
                >
                <img 
                  v-else
                  class="size-12 block" 
                  src="@/assets/images/customeravatar.svg" 
                  alt="default store icon"
                >
                <div>
                  <p class="font-medium text-gray-800">{{ store.name }}</p>
                  <p class="text-sm text-gray-500">{{ store.subdomain }}</p>
                </div>
              </div>
          
              <div class="text-sm text-gray-500 capitalize">
                {{ store.type }}
              </div>
  
              <div class="text-sm text-gray-500">
                {{ formatDate(store.created_at) }}
              </div>
          
              <div class="flex items-center gap-1">
                <span 
                  :class="[
                    'px-3 py-1 text-sm font-medium rounded-full',
                    store.status === 'active' 
                      ? 'text-green-700 bg-green-100' 
                      : store.status === 'disabled'
                        ? 'text-gray-700 bg-gray-100'
                        : 'text-red-700 bg-red-100'
                  ]"
                >
                  {{ store.status }}
                </span>
              </div>
          
              <div class="flex flex-col items-center gap-2 md:flex-row md:justify-end md:gap-3">
                <button 
                  v-if="store.status !== 'active'"
                  @click="changeStatus(store.id, 'active')"
                  class="px-3 py-1 text-sm font-medium text-[#3D9E84] hover:text-[#3D9E8490]"
                  :disabled="statusLoading[store.id]"
                >
                  <span v-if="statusLoading[store.id]">Processing...</span>
                  <span v-else>Activate</span>
                </button>
                <button 
                  v-if="store.status !== 'disabled'"
                  @click="changeStatus(store.id, 'disabled')"
                  class="px-3 py-1 text-sm font-medium text-[#FFAE2C] hover:text-[#FFAE2C90]"
                  :disabled="statusLoading[store.id]"
                >
                  <span v-if="statusLoading[store.id]">Processing...</span>
                  <span v-else>Suspend</span>
                </button>
                <button 
                  v-if="store.status !== 'deleted'"
                  @click="changeStatus(store.id, 'deleted')"
                  class="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800"
                  :disabled="statusLoading[store.id]"
                >
                  <span v-if="statusLoading[store.id]">Processing...</span>
                  <span v-else>Delete</span>
                </button>
              </div>
            </div>
          </div>
  
          <div v-if="filteredStores.length > itemsPerPage" class="mt-6 flex justify-center gap-2">
            <button 
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-4 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              @click="nextPage"
              :disabled="currentPage * itemsPerPage >= filteredStores.length"
              class="px-4 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </template>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
  import { useStoreStore } from '@/stores/store'
  
  const storeStore = useStoreStore()
  const loading = ref(true)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = 10
  const statusLoading = ref({})
  
  onMounted(async () => {
    try {
      await storeStore.fetchAllStores()
    } finally {
      loading.value = false
    }
  })
  
  const stores = computed(() => storeStore.allStores || [])
  
  const filteredStores = computed(() => {
    if (!searchQuery.value) return stores.value
    return stores.value.filter(store => 
      store.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      store.subdomain.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      store.type.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  
  const paginatedStores = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredStores.value.slice(start, end)
  })
  
  const filterStores = () => {
    currentPage.value = 1
  }
  
  const nextPage = () => {
    if (currentPage.value * itemsPerPage < filteredStores.value.length) {
      currentPage.value++
    }
  }
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  const changeStatus = async (storeId, newStatus) => {
    statusLoading.value[storeId] = true
    try {
      await storeStore.updateStoreStatus(storeId, newStatus)
    } catch (error) {
      console.error('Error updating store status:', error)
    } finally {
      statusLoading.value[storeId] = false
    }
  }
  </script>