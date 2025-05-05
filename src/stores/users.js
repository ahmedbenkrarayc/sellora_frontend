import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUsersStore = defineStore('users', () => {
  const storeOwners = ref([])
  const error = ref(null)
  const loading = ref(false)

  const fetchStoreOwners = async () => {
    loading.value = true
    error.value = null
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.get(`${apiUrl}/storeowners`, {
        withCredentials: true,
      })

      if (response.status === 200) {
        storeOwners.value = response.data
      } else {
        throw new Error('Failed to fetch store owners')
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Unknown error'
      console.error('Error fetching store owners:', error.value)
    } finally {
      loading.value = false
    }
  }

  return {
    storeOwners,
    error,
    loading,
    fetchStoreOwners
  }
})