import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useSubscriptionStore = defineStore('subscription', () => {
  const apiUrl = import.meta.env.VITE_API_URL 
  const isSubscribed = ref(false)
  const loading = ref(false)

  const fetchStatus = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/user`, { withCredentials: true })
      isSubscribed.value = data.store?.is_active || false
    } catch (error) {
      console.error('Fetch status failed', error)
    }
  }

  const subscribe = async (paymentMethod) => {
    loading.value = true
    try {
      await axios.post(`${apiUrl}/subscribe`, 
        { payment_method: paymentMethod },
        { withCredentials: true }
      )
      isSubscribed.value = true
    } finally {
      loading.value = false
    }
  }

  const cancel = async () => {
    loading.value = true
    try {
      await axios.post(`${apiUrl}/cancel`, {}, { withCredentials: true })
      isSubscribed.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    isSubscribed,
    loading,
    fetchStatus,
    subscribe,
    cancel,
  }
})