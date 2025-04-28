<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
    <WelcomeMessage description="Manage your customers effortlessly and stay ahead!" />
    <div class="my-8 px-4 sm:px-0">
      <div class="flex items-center gap-2 bg-white px-4 py-2 w-full sm:w-fit sm:ml-auto rounded-md border-2 border-[#D3D3D3] max-w-full sm:max-w-[250px] mx-auto sm:mx-0">
        <img class="w-4 h-4" src="@/assets/images/search.svg" alt="search icon">
        <input 
          v-model="searchQuery"
          @input="filterCustomers"
          class="flex-1 text-[15px] outline-none bg-transparent placeholder-gray-400"
          type="text" 
          placeholder="Search..." />
      </div>
    </div>
    
    <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
      <div v-if="loading" class="text-center py-8">Loading customers...</div>
      <div v-else-if="filteredCustomers.length === 0" class="text-center py-8 text-gray-500">
        No customers found
      </div>

      <template v-else>
        <div 
          v-for="customer in paginatedCustomers"
          :key="customer.id"
          class="bg-white rounded-lg shadow-sm mb-4 p-4"
        >
          <div class="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left md:space-x-6 space-y-4 md:space-y-0">
            
            <div class="flex flex-col items-center md:flex-row md:items-center md:gap-4 gap-2">
              <img class="size-12 block" src="@/assets/images/customeravatar.svg" alt="customer avatar">
              <div>
                <p class="font-medium text-gray-800">{{ customer.name }}</p>
                <p class="text-sm text-gray-500">{{ customer.email }}</p>
              </div>
            </div>
        
            <div class="flex justify-center md:justify-start">
              <span 
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-full',
                  customer.status === 'active' 
                    ? 'text-green-700 bg-green-100' 
                    : 'text-red-700 bg-red-100'
                ]"
              >
                {{ customer.status }}
              </span>
            </div>
        
            <div class="text-sm text-gray-500">
              {{ formatDate(customer.created_at) }}
            </div>
        
            <div class="flex flex-col items-center gap-2 md:flex-row md:justify-end md:gap-3">
              <button 
                class="px-3 py-1 text-sm font-medium text-green-600 hover:text-green-800"
              >
                Activate
              </button>
              <button 
                class="px-3 py-1 text-sm font-medium text-yellow-600 hover:text-yellow-800"
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

        <div v-if="filteredCustomers.length > itemsPerPage" class="mt-6 flex justify-center gap-2">
          <button 
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            @click="nextPage"
            :disabled="currentPage * itemsPerPage >= filteredCustomers.length"
            class="px-4 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </template>
    </section>

    <transition name="fade">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 mx-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 text-center">Delete Customer</h3>
          <p class="text-gray-600 text-center mb-6">
            Are you sure you want to delete {{ customerToDelete?.name }}? This action cannot be undone.
          </p>
          <div class="flex justify-end gap-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              @click="deleteCustomer"
              class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
import { useStoreStore } from '@/stores/store'

const storeStore = useStoreStore()

// Data
const loading = ref(false)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const showDeleteModal = ref(false)
const customerToDelete = ref(null)

const customers = computed(() => storeStore.storeData?.customers || [])

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value
  return customers.value.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCustomers.value.slice(start, end)
})

const filterCustomers = () => {
  currentPage.value = 1
}

const nextPage = () => {
  if (currentPage.value * itemsPerPage < filteredCustomers.value.length) {
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

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>