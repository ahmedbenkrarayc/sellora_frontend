<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
    <WelcomeMessage description="Manage your orders effortlessly and stay ahead!" />
    
    <div class="my-8 px-4 sm:px-0">
      <div class="flex items-center gap-2 bg-white px-4 py-2 w-full sm:w-fit sm:ml-auto rounded-md border border-gray-300 max-w-full sm:max-w-[250px] mx-auto sm:mx-0">
        <img class="w-4 h-4" src="@/assets/images/search.svg" alt="search icon" />
        <input
          v-model="search"
          @input="filterOrders"
          class="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
          type="text"
          placeholder="Search orders..."
        />
      </div>
    </div>

    <div v-for="order in orders" :key="order.id" class="bg-white rounded-lg shadow-sm p-6 mb-4 border border-gray-200">
      <div class="flex justify-between items-start pb-3 border-b border-gray-200">
        <div>
          <h3 class="font-bold text-lg"># {{ order.id }} - {{ order.customer }}</h3>
          <p class="text-gray-600 text-sm">{{ order.address }}</p>
        </div>
        
        <div class="relative">
          <button 
            @click.stop="toggleStatusDropdown(order.id)"
            class="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
            :class="getStatusClasses(order.status)"
          >
            {{ formatStatus(order.status) }}
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div 
            v-if="activeDropdown === order.id"
            class="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200"
          >
            <div class="py-1">
              <button
                @click.stop="updateStatus(order.id, 'pending')"
                class="block w-full text-left px-3 py-1 text-sm hover:bg-amber-50 text-amber-600"
              >
                Pending
              </button>
              <button
                @click.stop="updateStatus(order.id, 'processing')"
                class="block w-full text-left px-3 py-1 text-sm hover:bg-blue-50 text-blue-600"
              >
                Processing
              </button>
              <button
                @click.stop="updateStatus(order.id, 'completed')"
                class="block w-full text-left px-3 py-1 text-sm hover:bg-green-50 text-green-600"
              >
                Completed
              </button>
              <button
                @click.stop="updateStatus(order.id, 'canceled')"
                class="block w-full text-left px-3 py-1 text-sm hover:bg-red-50 text-red-600"
              >
                Canceled
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="py-3 border-b border-gray-200">
        <p class="text-gray-800">{{ order.location }}</p>
        <p class="text-gray-800">{{ order.postal }}</p>
      </div>
      
      <div class="py-3 border-b border-gray-200 space-y-2">
        <div v-for="(item, index) in order.items" :key="index" class="flex justify-between">
          <p class="font-medium">{{ item.name }}</p>
          <p class="text-gray-600">x{{ item.quantity }}</p>
        </div>
      </div>
      
      <div class="pt-3 flex justify-between items-center">
        <div class="flex space-x-4">
          <span class="font-bold text-lg">{{ order.price }}$</span>
          <span class="px-3 py-1 bg-gray-100 rounded-md text-sm">{{ order.type }}</span>
        </div>
        <span class="text-gray-500 text-sm">{{ order.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'

const orders = ref([
  {
    id: 'order1',
    customer: 'Ahmed Benkrara',
    address: '00 Rule 00 Qu test test',
    location: 'Soufi, Morocco',
    postal: '46650',
    items: [
      { name: 'T-shirt S Red', quantity: 2 },
      { name: 'T-shirt M Blue', quantity: 3 },
      { name: 'Jeans L Black', quantity: 1 }
    ],
    price: 200,
    type: 'Print',
    date: '10/10/2024',
    status: 'pending'
  },
  {
    id: 'order2',
    customer: 'Jane Smith',
    address: '01 Example 01 Test address',
    location: 'Casablanca, Morocco',
    postal: '20250',
    items: [
      { name: 'Jeans M Blue', quantity: 1 },
      { name: 'Cap Black', quantity: 2 }
    ],
    price: 150,
    type: 'Print',
    date: '09/10/2024',
    status: 'processing'
  },
  {
    id: 'order3',
    customer: 'Michael Brown',
    address: '02 Sample Address',
    location: 'Rabat, Morocco',
    postal: '10000',
    items: [
      { name: 'Sneakers White', quantity: 1 },
      { name: 'Socks Pack', quantity: 3 }
    ],
    price: 85,
    type: 'Digital',
    date: '08/10/2024',
    status: 'completed'
  },
  {
    id: 'order4',
    customer: 'Sarah Johnson',
    address: '03 Test Street',
    location: 'Tangier, Morocco',
    postal: '90000',
    items: [
      { name: 'Dress M Red', quantity: 1 }
    ],
    price: 75,
    type: 'Print',
    date: '07/10/2024',
    status: 'canceled'
  }
])

const activeDropdown = ref(null)
const search = ref('')

const toggleStatusDropdown = (orderId) => {
  activeDropdown.value = activeDropdown.value === orderId ? null : orderId
}

const updateStatus = (orderId, newStatus) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.status = newStatus
  }
  activeDropdown.value = null
}

const getStatusClasses = (status) => {
  return {
    'text-amber-600': status === 'pending',
    'text-blue-600': status === 'processing',
    'text-green-600': status === 'completed',
    'text-red-600': status === 'canceled'
  }
}

const formatStatus = (status) => {
  const statusMap = {
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    canceled: 'Canceled'
  }
  return statusMap[status] || status
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeDropdown.value = null
  }
}

const filterOrders = () => {
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
</style>