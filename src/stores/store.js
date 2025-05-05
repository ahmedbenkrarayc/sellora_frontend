import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useStoreStore = defineStore('store', () => {
  const storeData = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const allStores = ref([])

  const createStore = async (storeDataPayload) => {
    loading.value = true
    error.value = null
    try {
      const formData = new FormData()
      formData.append('name', storeDataPayload.storeName)
      formData.append('subdomain', storeDataPayload.storeUrl)
      if (storeDataPayload.logo) formData.append('logo', storeDataPayload.logo)
      formData.append('type', storeDataPayload.category)
      formData.append('status', 'disabled')
      formData.append('description', storeDataPayload.description)
      formData.append('storeowner_id', storeDataPayload.storeOwnerId)

      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.post(`${apiUrl}/stores`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })

      if (response.status === 201) {
        storeData.value = response.data
      } else {
        throw new Error('Failed to create store')
      }
    } catch (err) {
      if (err.response?.status === 422) {
        error.value = err.response?.data?.errors || 'Validation failed. Please check the form fields.'
      } else {
        error.value = err.response?.data?.message || err.message || 'Unknown error'
      }
      console.error('Error creating store:', error.value)
    } finally {
      loading.value = false
    }
  }

  const getStoreBySubdomain = async (subdomain) => {
    loading.value = true
    error.value = null
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.get(`${apiUrl}/stores/subdomain/${subdomain}`, {
        withCredentials: true,
      })

      if (response.status === 200) {
        storeData.value = response.data
      } else {
        throw new Error('Failed to fetch store data')
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Unknown error'
      storeData.value = null
      console.error('Error fetching store by subdomain:', error.value)
    } finally {
      loading.value = false
    }
  }

  const updateStore = async (id, updatePayload) => {
    loading.value = true
    error.value = null
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', id)
      formData.append('name', updatePayload.name)
      formData.append('subdomain', updatePayload.subdomain)
      formData.append('type', updatePayload.type)
      formData.append('storeowner_id', updatePayload.storeowner_id)
      formData.append('status', updatePayload.status)
      if (updatePayload.description) formData.append('description', updatePayload.description)
      if (updatePayload.logo) formData.append('logo', updatePayload.logo)

      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.post(`${apiUrl}/stores/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })

      if (response.status === 200) {
        storeData.value = response.data
      } else {
        throw new Error('Failed to update store')
      }
    } catch (err) {
      if (err.response?.status === 422) {
        error.value = err.response.data.errors || 'Validation failed. Please check the form fields.'
      } else {
        error.value = err.response?.data?.message || err.message || 'Unknown error'
      }
      console.error('Error updating store:', error.value)
    } finally {
      loading.value = false
    }
  }

  const fetchAllStores = async () => {
    loading.value = true
    error.value = null
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.get(`${apiUrl}/stores`, {
        withCredentials: true,
      })

      if (response.status === 200) {
        allStores.value = response.data
      } else {
        throw new Error('Failed to fetch stores')
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Unknown error'
      console.error('Error fetching stores:', error.value)
    } finally {
      loading.value = false
    }
  }

  const updateStoreStatus = async (id, status) => {
    loading.value = true
    error.value = null
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.put(
        `${apiUrl}/stores/status/${id}`,
        { status },
        { withCredentials: true }
      )

      if (response.status === 200) {
        const index = allStores.value.findIndex(store => store.id === id)
        if (index !== -1) {
          allStores.value[index].status = status
        }
        if (storeData.value?.id === id) {
          storeData.value.status = status
        }
        return response.data
      } else {
        throw new Error('Failed to update store status')
      }
    } catch (err) {
      if (err.response?.status === 422) {
        error.value = err.response?.data?.errors || 'Validation failed.'
      } else {
        error.value = err.response?.data?.message || err.message || 'Unknown error'
      }
      console.error('Error updating store status:', error.value)
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    storeData,
    error,
    loading,
    createStore,
    getStoreBySubdomain,
    updateStore,
    allStores,
    fetchAllStores,
    updateStoreStatus
  }
})
