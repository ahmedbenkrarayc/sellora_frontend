import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const loading = ref(false)
  const categories = ref([])
  const error = ref(null)

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

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${apiUrl}/categories`, {
        withCredentials: true,
      })
      categories.value = response.data
    } catch (err) {
      error.value = err?.response?.data?.message || 'Failed to load categories'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const deleteCategory = async (id) => {
    loading.value = true
    try {
      await axios.delete(`${apiUrl}/categories/${id}`, {
        withCredentials: true,
      })
      categories.value = categories.value.filter(cat => cat.id !== id)
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete category'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategory(id) {
    try {
      const { data } = await axios.get(`${apiUrl}/categories/${id}`, {
        withCredentials: true,
      })

      return data
    } catch (error) {
      throw error
    }
  }
  
  async function updateCategory(id, payload) {
    loading.value = true
    try {
      await axios.put(`${apiUrl}/categories/${id}`, payload, {
        withCredentials: true,
      })
      await fetchCategories()
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }
  
  

  return {
    loading,
    createCategory,
    categories,
    error,
    fetchCategories,
    deleteCategory,
    fetchCategory,
    updateCategory
  }
})
