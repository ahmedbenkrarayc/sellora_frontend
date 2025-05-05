import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useStatisticsStore = defineStore('statistics', () => {
  const adminStats = ref(null)
  const storeOwnerStats = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const getAdminDashboard = async () => {
    loading.value = true
    error.value = null
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.get(`${apiUrl}/admin/statistics`, {
        withCredentials: true
      })

      if (response.status === 200) {
        adminStats.value = response.data
      } else {
        throw new Error('Failed to fetch admin dashboard statistics')
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Unknown error'
      console.error('Error fetching admin statistics:', error.value)
    } finally {
      loading.value = false
    }
  }

  const getStoreOwnerDashboard = async (storeId) => {
    loading.value = true
    error.value = null
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.get(`${apiUrl}/storeowner/statistics/${storeId}`, {
        withCredentials: true
      })

      if (response.status === 200) {
        storeOwnerStats.value = response.data
      } else {
        throw new Error('Failed to fetch store owner dashboard statistics')
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Unknown error'
      console.error('Error fetching store owner statistics:', error.value)
    } finally {
      loading.value = false
    }
  }

  return {
    adminStats,
    storeOwnerStats,
    error,
    loading,
    getAdminDashboard,
    getStoreOwnerDashboard
  }
})