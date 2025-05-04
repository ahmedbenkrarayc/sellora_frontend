<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
    <Toast ref="toastRef" />

    <WelcomeMessage description="Manage your orders effortlessly and stay ahead!" />
    
    <div class="my-8 px-4 sm:px-0">
      <div class="flex items-center gap-2 bg-white px-4 py-2 w-full sm:w-fit sm:ml-auto rounded-md border border-gray-300 max-w-full sm:max-w-[300px] mx-auto sm:mx-0">
        <img class="w-4 h-4" src="@/assets/images/search.svg" alt="search icon" />
        <input
          v-model="searchQuery"
          class="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
          type="text"
          placeholder="Norder or customer"
        />
      </div>
    </div>

    <div v-if="orderStore.loading && !orderStore.orders.length" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-if="!orderStore.loading && filteredOrders.length === 0 && !orderStore.error" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">
        {{ searchQuery ? 'No orders match your search' : 'No orders found' }}
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        {{ searchQuery ? 'Try a different search term' : 'Get started by creating your first order' }}
      </p>
      <button 
        v-if="searchQuery"
        @click="clearSearch"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
      >
        Clear Search
      </button>
    </div>

    <div 
      v-for="order in filteredOrders" 
      :id="`print-order-${order.id}`"
      :key="order.id" 
      class="bg-white rounded-xl shadow-sm p-5 mb-4 border border-gray-100 hover:shadow-md transition-shadow duration-200"
    >
      <div class="flex justify-between items-start pb-3">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-gray-800">Order #{{ order.id }}</h3>
            <span v-if="isNewOrder(order.date)" class="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              New
            </span>
          </div>
          <div class="mt-1 flex items-center text-sm text-gray-500">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ formatOrderDate(order.date) }}</span>
          </div>
        </div>
        
        <div class="relative">
          <button 
            @click.stop="toggleStatusDropdown(order.id)"
            class="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors"
            :class="statusOptions[order.status].color + ' border'"
          >
            {{ statusOptions[order.status].label }}
            <svg class="w-3 h-3 transition-transform" :class="{'rotate-180': activeDropdown === order.id}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div 
            v-if="activeDropdown === order.id"
            class="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg z-10 border border-gray-200 overflow-hidden"
          >
            <div class="py-1">
              <button
                v-for="(status, key) in statusOptions"
                :key="key"
                @click.stop="updateStatus(order.id, key)"
                class="block w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors"
                :class="{
                  'hover:bg-amber-50 text-amber-600': key === 'pending',
                  'hover:bg-blue-50 text-blue-600': key === 'processing',
                  'hover:bg-green-50 text-green-600': key === 'completed',
                  'hover:bg-red-50 text-red-600': key === 'canceled',
                  'opacity-50 cursor-not-allowed': orderStore.loading
                }"
                :disabled="orderStore.loading"
              >
                <span 
                  class="w-2 h-2 rounded-full"
                  :class="{
                    'bg-amber-500': key === 'pending',
                    'bg-blue-500': key === 'processing',
                    'bg-green-500': key === 'completed',
                    'bg-red-500': key === 'canceled'
                  }"
                ></span>
                {{ status.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex items-center gap-3 py-3 border-t border-gray-100">
        <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
          {{ getCustomerInitial(order.customer?.name) }}
        </div>
        <div>
          <p class="text-sm font-medium text-gray-800">{{ order.customer?.name || 'Customer' }}</p>
          <p class="text-xs text-gray-500">{{ order.customer?.email || 'No email provided' }}</p>
        </div>
      </div>
      
      <div class="py-3 border-t border-gray-100 space-y-3">
        <div v-for="(item, index) in order.items" :key="index" class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div v-if="item.images?.length" class="relative">
              <img 
                :src="getImageUrl(item.images[0].path)" 
                class="w-12 h-12 object-cover rounded-lg border border-gray-200"
                alt="Product image"
              >
              <span class="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium text-gray-700 shadow-xs">
                {{ item.quantity }}
              </span>
            </div>
            <div>
              <p class="font-medium text-gray-800">{{ item.name }}</p>
              <p class="text-xs text-gray-500">${{ formatPrice(item.price) }}</p>
            </div>
          </div>
          <span class="text-sm font-medium text-gray-700">${{ formatPrice(item.price * item.quantity) }}</span>
        </div>
      </div>
      
      <div class="pt-3">
        <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          <div class="text-base font-medium text-gray-800">Total</div>
          <div class="text-lg font-bold text-gray-900">${{ formatPrice(order.price) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Toast from 'primevue/toast'
import { useOrderStore } from '@/stores/order'
import { useStoreStore } from '@/stores/store'
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
const toastRef = ref()

const storeStore = useStoreStore()
const orderStore = useOrderStore()
const activeDropdown = ref(null)
const searchQuery = ref('')

const statusOptions = {
  pending: { label: 'Pending', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  processing: { label: 'Processing', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  completed: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-100' },
  canceled: { label: 'Canceled', color: 'bg-red-50 text-red-700 border-red-100' }
}

watch(
  () => orderStore.error,
  (newError) => {
    if (newError) {
      toastRef.value.add({ severity: 'error', summary: 'Validation Error', detail: 'Something went wrong please try again later.', life: 3000 })
    }
  }
)

watch(
  () => storeStore.loading,
  (isLoading) => {
    if (!isLoading) {
      fetchOrders()
  
      window.Echo.channel(`order-placed${storeStore.storeData.id}`)
        .listen('.order.placed', (data) => {
          console.log(data)
          orderStore.orders.unshift({
            id: `order${data.order.id}`,
            originalId: data.order.id,
            customer_id: data.order.customer_id,
            customer: data.order.customer ? {
              id: data.order.customer.id,
              name: `${data.order.customer.user?.fname || ''} ${data.order.customer.user?.lname || ''}`.trim(),
              email: data.order.customer.user?.email || ''
            } : null,
            address: {
              street: data.order.address,
              city: data.order.city,
              country: data.order.country,
              postal: data.order.postalcode
            },
            items: data.order.productvariants.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.pivot.quantity,
              price: item.price,
              images: item.images || []
            })),
            price: data.order.price,
            date: new Date(data.order.created_at).toLocaleDateString(),
            status: 'pending'
          })
          
          toastRef.value.add({
            severity: 'success',
            summary: 'New Order Received!',
            detail: `Order #${data.order.id} from ${data.order.customer?.name || 'a customer'}`,
            life: 5000
          })
        })
    }
  }
)

const fetchOrders = async () => {
  try {
    await orderStore.fetchStoreOrders(storeStore.storeData.id)
  } catch {
    toastRef.value.add({ 
      severity: 'error', 
      summary: 'Validation Error', 
      detail: 'Something went wrong please try again later.', 
      life: 3000 
    })
  }
}

const filteredOrders = computed(() => {
  if (!searchQuery.value.trim()) return orderStore.orders
  
  const query = searchQuery.value.toLowerCase().trim()
  return orderStore.orders.filter(order => {
    return (
      order.id.toString().toLowerCase().includes(query) || 
      (order.customer?.name?.toLowerCase().includes(query)) || 
      (order.customer?.email?.toLowerCase().includes(query))
    )
  })
})

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2)
}

const formatOrderDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const isNewOrder = (dateString) => {
  const orderDate = new Date(dateString)
  return (Date.now() - orderDate) < 24 * 60 * 60 * 1000
}

const getCustomerInitial = (name) => {
  return name?.charAt(0)?.toUpperCase() || 'C'
}

const getImageUrl = (path) => {
  return path?.startsWith('http') ? path : `${import.meta.env.VITE_IMAGES_URL}/${path}`
}

const toggleStatusDropdown = (orderId) => {
  activeDropdown.value = activeDropdown.value === orderId ? null : orderId
}

const updateStatus = async (orderId, newStatus) => {
  try {
    await orderStore.updateOrderStatus(orderId, newStatus)
    activeDropdown.value = null
  } catch {
    toastRef.value.add({ severity: 'error', summary: 'Validation Error', detail: 'Failed to update status. Please try again.', life: 3000 })
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeDropdown.value = null
  }
}

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  if (!storeStore.loading) {
    await fetchOrders()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.hover\:shadow-md {
  transition: box-shadow 0.3s ease;
}
</style>