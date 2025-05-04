<template>
    <Toast ref="toastRef" />

    <HeaderSection title="Your Orders, Your Way." />
  
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div class="mb-6">
        <div class="relative max-w-md">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            @input="resetPagination"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search by order ID..."
            type="search"
          />
        </div>
      </div>

      <div v-if="filteredOrders.length > 0" class="space-y-6">
        <div v-for="order in paginatedOrders" :key="order.id" class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div class="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-3">
                <h2 class="font-medium text-gray-900">Order #{{ order.id }}</h2>
                <span 
                  :class="{
                    'px-2.5 py-0.5 rounded-full text-xs font-medium capitalize': true,
                    'bg-amber-100 text-amber-800': order.status === 'pending',
                    'bg-blue-100 text-blue-800': order.status === 'shipped',
                    'bg-green-100 text-green-800': order.status === 'delivered',
                    'bg-red-100 text-red-800': order.status === 'cancelled'
                  }"
                >
                  {{ order.status }}
                </span>
              </div>
              <p class="text-sm text-gray-500">
                Placed on {{ formatDate(order.created_at) }} • 
                {{ order.city }}, {{ order.country }}
              </p>
            </div>
            
            <button 
              v-if="order.status === 'pending'"
              @click="openCancelModal(order.id)"
              class="flex items-center gap-1.5 text-sm font-medium text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
              :disabled="orderStore.loading"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {{ orderStore.loading ? 'Processing...' : 'Cancel Order' }}
            </button>
          </div>
          
          <div class="divide-y divide-gray-100">
            <div v-for="item in order.productvariants" :key="item.id" class="p-5 flex flex-col sm:flex-row gap-4">
              <div class="flex-shrink-0">
                <img 
                  class="w-24 h-24 rounded-lg object-cover border border-gray-200" 
                  :src="getImageUrl(item.images[0]?.path)" 
                  :alt="item.name"
                />
              </div>
              
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-gray-900 truncate">{{ item.name }}</h3>
                <p class="text-sm text-gray-500 mt-1">Quantity: {{ item.pivot.quantity }}</p>
                <p class="text-sm text-gray-500">Price: ${{ item.price.toFixed(2) }}</p>
              </div>
              
              <div class="sm:text-right">
                <p class="font-medium text-gray-900">${{ (item.price * item.pivot.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
          
          <div class="p-5 bg-gray-50 flex justify-end">
            <div class="flex items-baseline gap-4">
              <span class="text-sm text-gray-500">Total</span>
              <span class="text-lg font-bold text-gray-900">${{ order.price.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div v-if="showLoadMore" class="text-center mt-8">
          <button
            @click="loadMore"
            class="w-fit mt-10 px-6 py-2 bg-[black] hover:bg-[#1d242d90] transition-all font-[300] font-poppins text-[white]"
            :disabled="orderStore.loading"
          >
            {{ orderStore.loading ? 'Loading...' : 'Load More' }}
          </button>
        </div>
      </div>
      
      <div v-else-if="!orderStore.loading" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">
          {{ searchQuery ? 'No orders found' : 'No orders yet' }}
        </h3>
        <p class="mt-1 text-gray-500">
          {{ searchQuery ? 'Try a different search term' : "You haven't placed any orders with us yet." }}
        </p>
        <div class="mt-6">
          <router-link 
            to="/shop" 
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-black hover:bg-black transition-colors"
          >
            Start Shopping
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
        </div>
      </div>
  
      <div v-else class="text-center py-12">
        <p class="text-gray-500">Loading your orders...</p>
      </div>
    </div>

    <div v-if="showCancelModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Cancel Order</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Are you sure you want to cancel this order? This action cannot be undone.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="confirmCancel"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              :disabled="orderStore.loading"
            >
              {{ orderStore.loading ? 'Processing...' : 'Cancel Order' }}
            </button>
            <button
              type="button"
              @click="closeCancelModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useOrderStore } from '@/stores/order'
import { useAuthStore } from '@/stores/auth/storeowner/auth'
import HeaderSection from '@/components/store/header/HeaderSection.vue'
import Toast from 'primevue/toast'
const toastRef = ref()
  
const orderStore = useOrderStore()
const authStore = useAuthStore()

const itemsPerPage = 10
const currentPage = ref(1)
const searchQuery = ref('')

const showCancelModal = ref(false)
const selectedOrderId = ref(null)
  
onMounted(async () => {
    await orderStore.fetchCustomerOrders(authStore.user.id)
    window.Echo.channel(`order-updated${authStore.user.id}`)
    .listen('.order.updated', async (data) => {
        toastRef.value.add({
            severity: 'success',
            summary: 'Order Status Updated!',
            detail: `Order #${data.order.id}`,
            life: 5000
        })
        await orderStore.fetchCustomerOrders(authStore.user.id)
    })
})
  
  const filteredOrders = computed(() => {
    if (!searchQuery.value) return orderStore.customerOrders
    return orderStore.customerOrders.filter(order => 
      order.id.toString().includes(searchQuery.value.toLowerCase())
    )
  })
  
  const paginatedOrders = computed(() => {
    const start = 0
    const end = currentPage.value * itemsPerPage
    return filteredOrders.value.slice(start, end)
  })
  
  const showLoadMore = computed(() => {
    return paginatedOrders.value.length < filteredOrders.value.length
  })
  
  const loadMore = () => {
    currentPage.value += 1
  }
  
  const resetPagination = () => {
    currentPage.value = 1
  }
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  const getImageUrl = (path) => {
    return import.meta.env.VITE_IMAGES_URL+'/'+path
  }
  
  const openCancelModal = (orderId) => {
    selectedOrderId.value = orderId
    showCancelModal.value = true
  }
  
  const closeCancelModal = () => {
    showCancelModal.value = false
    selectedOrderId.value = null
  }
  
  const confirmCancel = async () => {
    if (!selectedOrderId.value) return
    
    try {
      await orderStore.updateOrderStatus(selectedOrderId.value, 'canceled')
      await orderStore.fetchCustomerOrders(authStore.user.id)
      closeCancelModal()
    } catch (error) {
      console.error('Failed to cancel order:', error)
    }
  }
</script>
  
<style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
</style>