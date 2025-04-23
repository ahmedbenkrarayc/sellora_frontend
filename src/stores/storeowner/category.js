import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const loading = ref(false)

  const createCategory = async (payload) => {
    loading.value = true
    try {
      const response = await axios.post(`${apiUrl}/categories`, payload, {
        withCredentials: true,
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    createCategory
  }
})
