import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useSubscriptionStore = defineStore('subscription', () => {
  const apiUrl = import.meta.env.VITE_API_URL 
  const isSubscribed = ref(false)
  const loading = ref(false)
  const error = ref(null)
  const history = ref([])

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

  const fetchSubscriptionHistory = async () => {
    loading.value = true
    error.value = null
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.get(`${apiUrl}/subscription/history`, {
        withCredentials: true
      })

      if (response.status === 200) {
        history.value = response.data
      } else {
        throw new Error('Failed to fetch subscription history')
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Unknown error'
      console.error('Error fetching subscription history:', error.value)
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
    history,
    fetchSubscriptionHistory
  }
})