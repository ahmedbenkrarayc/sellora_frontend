<template>
    <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
      <WelcomeMessage description="Manage your store owners efficiently" />
      <div class="my-8 px-4 sm:px-0">
        <div class="flex items-center gap-2 bg-white px-4 py-2 w-full sm:w-fit sm:ml-auto rounded-md border-2 border-[#D3D3D3] max-w-full sm:max-w-[250px] mx-auto sm:mx-0">
          <img class="w-4 h-4" src="@/assets/images/search.svg" alt="search icon">
          <input 
            v-model="searchQuery"
            @input="filterStoreOwners"
            class="flex-1 text-[15px] outline-none bg-transparent placeholder-gray-400"
            type="text" 
            placeholder="Search..." />
        </div>
      </div>
      
      <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
        <div v-if="loading" class="text-center py-8">Loading store owners...</div>
        <div v-else-if="filteredStoreOwners.length === 0" class="text-center py-8 text-gray-500">
          No store owners found
        </div>
  
        <template v-else>
          <div 
            v-for="owner in paginatedStoreOwners"
            :key="owner.id"
            class="bg-white rounded-lg shadow-sm mb-4 p-4"
          >
            <div class="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left md:space-x-6 space-y-4 md:space-y-0">
              
              <div class="flex flex-col items-center md:flex-row md:items-center md:gap-4 gap-2">
                <img class="size-12 block" src="@/assets/images/customeravatar.svg" alt="store owner avatar">
                <div>
                  <p class="font-medium text-gray-800">{{ owner.fname }} {{ owner.lname }}</p>
                  <p class="text-sm text-gray-500">{{ owner.email }}</p>
                </div>
              </div>
          
              <div class="text-sm text-gray-500">
                {{ owner.store?.name }}
              </div>

              <div class="text-sm text-gray-500">
                {{ formatDate(owner.created_at) }}
              </div>
          
              <div class="flex flex-col items-center gap-2 md:flex-row md:justify-end md:gap-3">
                <button 
                  class="px-3 py-1 text-sm font-medium text-[#3D9E84] hover:text-[#3D9E8490]"
                >
                  Activate
                </button>
                <button 
                  class="px-3 py-1 text-sm font-medium text-[#FFAE2C] hover:text-[#FFAE2C90]"
                >
                  Suspend
                </button>
                <button 
                  class="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
  
          <div v-if="filteredStoreOwners.length > itemsPerPage" class="mt-6 flex justify-center gap-2">
            <button 
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-4 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              @click="nextPage"
              :disabled="currentPage * itemsPerPage >= filteredStoreOwners.length"
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
  import { useUsersStore } from '@/stores/users'
  
  const usersStore = useUsersStore()
  const loading = ref(true)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = 10
  
  onMounted(async () => {
    try {
      await usersStore.fetchStoreOwners()
    } finally {
      loading.value = false
    }
  })
  
  const storeOwners = computed(() => usersStore.storeOwners || [])
  
  const filteredStoreOwners = computed(() => {
    if (!searchQuery.value) return storeOwners.value
    return storeOwners.value.filter(owner => 
      owner.fname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      owner.lname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  
  const paginatedStoreOwners = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredStoreOwners.value.slice(start, end)
  })
  
  const filterStoreOwners = () => {
    currentPage.value = 1
  }
  
  const nextPage = () => {
    if (currentPage.value * itemsPerPage < filteredStoreOwners.value.length) {
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
</script>