<template>
    <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
      <WelcomeMessage description="View all subscription transactions and payment history" />
  
      <div class="my-8 px-4 sm:px-0">
        <div class="flex items-center gap-2 bg-white px-4 py-2 w-full sm:w-fit sm:ml-auto rounded-md border border-gray-300 max-w-full sm:max-w-[250px] mx-auto sm:mx-0">
          <img class="w-4 h-4" src="@/assets/images/search.svg" alt="search icon" />
          <input
            v-model="search"
            @input="filterSubscriptions"
            class="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
            type="text"
            placeholder="Search by status..."
          />
        </div>
      </div>
  
      <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
        <div v-if="subscriptionStore.loading">Loading subscription history...</div>
        <div v-else-if="filteredSubscriptions.length === 0" class="text-center text-gray-500">
          No subscription records found.
        </div>
  
        <div
          v-for="subscription in paginatedSubscriptions"
          :key="subscription.id"
          class="bg-white rounded-lg shadow-sm mb-4 p-4"
        >
          <div class="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left md:space-x-6 space-y-4 md:space-y-0">
            <div class="flex flex-col items-center md:flex-row md:items-center md:gap-4 gap-2">
              <div class="relative">
                <img 
                  src="@/assets/images/client-icon.svg" 
                  class="size-12 rounded-full object-cover"
                  alt="client icon"
                />
                <span
                  :class="[
                    'absolute bottom-0 right-0 size-3 rounded-full border-2 border-white',
                    subscription.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                  ]"
                ></span>
              </div>
              <div>
                <p class="font-medium text-gray-800">
                  {{ subscription.user.fname }} {{ subscription.user.lname }}
                </p>
                <p class="text-sm text-gray-500">{{ subscription.user.email }}</p>
              </div>
            </div>
  
            <div class="text-sm font-medium text-gray-800">
              {{ subscription.user.store.name }}
            </div>
  
            <div class="text-sm font-medium">$20.00</div>
  
            <div class="flex justify-center md:justify-start">
              <span
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-full',
                  subscription.status === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                ]"
              >
                {{ subscription.status }}
              </span>
            </div>
  
            <div class="text-sm text-gray-500">
              {{ formatDateTime(subscription.recorded_at) }}
            </div>
          </div>
        </div>
  
        <div v-if="filteredSubscriptions.length > limit" class="mt-6 flex justify-center gap-2">
          <button 
            @click="prevPage" 
            :disabled="page <= 1" 
            class="px-4 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            @click="nextPage" 
            :disabled="endIndex >= filteredSubscriptions.length" 
            class="px-4 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue'
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
import { useSubscriptionStore } from '@/stores/subscription'
  
const subscriptionStore = useSubscriptionStore()
  
const search = ref('')
const page = ref(1)
const limit = 10
  
const filteredSubscriptions = computed(() => {
    if (!search.value) return subscriptionStore.history
    
    return subscriptionStore.history.filter(sub => 
      sub.status.toLowerCase().includes(search.value.toLowerCase()))
})
  
const startIndex = computed(() => (page.value - 1) * limit)
const endIndex = computed(() => page.value * limit)
const paginatedSubscriptions = computed(() =>
    filteredSubscriptions.value.slice(startIndex.value, endIndex.value)
)
  
const filterSubscriptions = () => {
    page.value = 1
}
  
const nextPage = () => {
    if (endIndex.value < filteredSubscriptions.value.length) {
      page.value++
    }
}
  
const prevPage = () => {
    if (page.value > 1) {
      page.value--
    }
}
  
const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
}
  
onMounted(async () => {
    await subscriptionStore.fetchSubscriptionHistory()
})
</script>
  
<style scoped>

</style>