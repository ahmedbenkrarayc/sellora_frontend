import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useStoreStore = defineStore('store', () => {
  const storeData = ref(null)
  const error = ref(null)

  const createStore = async (storeDataPayload) => {
    try {
      const formData = new FormData()
      formData.append('name', storeDataPayload.storeName)
      formData.append('subdomain', storeDataPayload.storeUrl)
      if(storeDataPayload.logo)
        formData.append('logo', storeDataPayload.logo)
      formData.append('type', storeDataPayload.category)
      formData.append('status', 'disabled')
      formData.append('description', storeDataPayload.description)
      formData.append('storeowner_id', storeDataPayload.storeOwnerId)

      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.post(`${apiUrl}/stores`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      })

      if(response.status === 201) {
        storeData.value = response.data
      }else{
        throw new Error('Failed to create store')
      }
    }catch(err){
      if(err.response?.status === 422) {
        error.value = err.response?.data?.errors || 'Validation failed. Please check the form fields.'
      }else{
        error.value = err.response?.data?.message || err.message || 'Unknown error'
      }
      console.error('Error creating store:', error.value)
    }
  }

  return {
    storeData,
    error,
    createStore
  }
})
