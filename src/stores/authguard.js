import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthGuardStore = defineStore('authguard', () => {
  const isAuthenticated = ref(false)
  const userRole = ref(null)
  const isLoading = ref(true)
  const apiUrl = import.meta.env.VITE_API_URL

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user`,{
        withCredentials: true
      })
      
      if (response.data) {
        isAuthenticated.value = true
        userRole.value = response.data.role
      } else {
        isAuthenticated.value = false
        userRole.value = null
      }
    } catch (error) {
      isAuthenticated.value = false
      userRole.value = null
    } finally {
      isLoading.value = false
    }
  }

  return {
    isAuthenticated,
    userRole,
    isLoading,
    checkAuth,
  }
})
