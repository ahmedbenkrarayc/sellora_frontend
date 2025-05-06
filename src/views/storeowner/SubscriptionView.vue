<template>
    <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
      <Toast ref="toastRef" />
      <WelcomeMessage description="Manage your subscription and access premium features!" />
      
      <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
        <div class="bg-white px-4 py-6 sm:px-8 md:px-12 lg:px-16 lg:py-12 rounded-lg">
          <h3 class="font-medium text-[19px] text-[#222222] mb-12">Subscription Plan</h3>
          
          <div v-if="loading" class="flex items-center justify-center p-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#493D9E]"></div>
            <span class="ml-3 text-[14px]">Loading subscription status...</span>
          </div>
  
          <div v-else>
            <div v-if="isSubscribed" class="space-y-6">
              <div class="p-4 border border-green-200 bg-green-50 rounded-md">
                <p class="text-green-600 text-[14px]">You are currently subscribed to our standard plan.</p>
              </div>
              
              <button
                @click="cancelSubscription"
                :disabled="processing"
                class="block mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 w-fit text-white rounded-md text-[14px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ processing ? 'Processing...' : 'Cancel Subscription' }}
              </button>
            </div>
  
            <div v-else class="space-y-6">
              <div class="p-4 border border-blue-200 bg-blue-50 rounded-md">
                <p class="text-[14px]">Subscribe now to unlock premium features for just $20/month</p>
              </div>
  
              <div class="mb-4">
                <label for="paymentMethod" class="text-[14px]">Payment Method ID <span class="text-red-600">*</span></label>
                <input
                  v-model="paymentMethod"
                  id="paymentMethod"
                  class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400"
                  type="text"
                  placeholder="Enter payment method ID (e.g., pm_1234)"
                  @keyup.enter="subscribeNow"
                />
              </div>
  
              <button
                @click="subscribeNow"
                :disabled="processing || !paymentMethod"
                class="block mt-6 px-6 py-2 bg-[#493D9E] hover:bg-[#42369e] w-fit text-white rounded-md text-[14px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ processing ? 'Processing...' : 'Subscribe Now' }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
  
<script setup>
import { ref, onMounted, watch } from 'vue'
import Toast from 'primevue/toast'
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { storeToRefs } from 'pinia'
  
const toastRef = ref()
const paymentMethod = ref('')
const loading = ref(true)
const processing = ref(false)
  

const subscriptionStore = useSubscriptionStore()
const { isSubscribed } = storeToRefs(subscriptionStore)
  
watch(isSubscribed, (newVal) => {
    console.log('Subscription status changed:', newVal)
})
  
const loadSubscriptionStatus = async () => {
    loading.value = true
    try {
      await subscriptionStore.fetchStatus()
    } catch (error) {
      toastRef.value.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: error.response?.data?.message || 'Failed to load subscription status.', 
        life: 4000 
      })
    } finally {
      loading.value = false
    }
}
  
const subscribeNow = async () => {
    if (!paymentMethod.value) {
      toastRef.value.add({ severity: 'error', summary: 'Validation Error', detail: 'Payment method is required.', life: 3000 })
      return
    }
  
    if (!paymentMethod.value.startsWith('pm_')) {
      toastRef.value.add({ 
        severity: 'error', 
        summary: 'Validation Error', 
        detail: 'Please enter a valid payment method ID (should start with "pm_")', 
        life: 3000 
      })
      return
    }
  
    processing.value = true
    try {
      await subscriptionStore.subscribe(paymentMethod.value)
      toastRef.value.add({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Subscription activated successfully!', 
        life: 3000 
      })
      paymentMethod.value = ''
    } catch (error) {
      toastRef.value.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: error.response?.data?.message || 'Subscription failed. Please try again.', 
        life: 4000 
      })
    } finally {
      processing.value = false
    }
}
  
const cancelSubscription = async () => {
    processing.value = true
    try {
      await subscriptionStore.cancel()
      toastRef.value.add({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Subscription canceled successfully.', 
        life: 3000 
      })
    } catch (error) {
      toastRef.value.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: error.response?.data?.message || 'Failed to cancel subscription. Please try again.', 
        life: 4000 
      })
    } finally {
      processing.value = false
    }
}
  
onMounted(() => {
    loadSubscriptionStatus()
})
</script>
  
<style scoped>
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>