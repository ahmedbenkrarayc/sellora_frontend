import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useSubcategoryStore = defineStore('subcategory', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const loading = ref(false)
  const subcategories = ref([])
  const error = ref(null)

  const createSubcategory = async (payload) => {
    loading.value = true
    try {
      const response = await axios.post(`${apiUrl}/subcategories`, payload, {
        withCredentials: true,
      })
      return response.data
    } catch (err) {
      throw err.response?.data?.message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  const fetchSubcategories = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${apiUrl}/subcategories`, {
        withCredentials: true,
      })
      subcategories.value = response.data?.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load subcategories'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const deleteSubcategory = async (id) => {
    loading.value = true
    try {
      await axios.delete(`${apiUrl}/subcategories/${id}`, {
        withCredentials: true,
      })
      subcategories.value = subcategories.value.filter(sc => sc.id !== id)
    } catch (err) {
      throw err.response?.data?.message || 'Failed to delete subcategory'
    } finally {
      loading.value = false
    }
  }

  async function fetchSubcategory(id) {
    try {
      const { data } = await axios.get(`${apiUrl}/subcategories/${id}`, {
        withCredentials: true,
      })
      return data?.data
    } catch (err) {
      throw err
    }
  }

  async function updateSubcategory(id, payload) {
    loading.value = true
    try {
      await axios.put(`${apiUrl}/subcategories/${id}`, payload, {
        withCredentials: true,
      })
      await fetchSubcategories()
    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    subcategories,
    error,
    createSubcategory,
    fetchSubcategories,
    deleteSubcategory,
    fetchSubcategory,
    updateSubcategory,
  }
})
