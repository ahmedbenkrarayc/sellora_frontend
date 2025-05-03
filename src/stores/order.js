import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useOrderStore = defineStore('order', () => {
  const checkoutProducts = ref([])
  const currentOrder = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const createOrder = async (orderDetails) => {
    loading.value = true
    error.value = null
    
    try {
      const orderData = {
        ...orderDetails,
        price: checkoutProducts.value.reduce((total, item) => total + (item.price * item.quantity), 0),
        product_variants: checkoutProducts.value.map(item => ({
          id: item.productvariant_id,
          quantity: item.quantity
        }))
      }

      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.post(`${apiUrl}/orders`, orderData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.status === 201) {
        currentOrder.value = response.data
        checkoutProducts.value = []
        return response.data
      }
      throw new Error('Failed to create order')
    } catch (err) {
      error.value = err.response?.data?.message || 
                  err.response?.data?.errors || 
                  err.message || 
                  'Order failed. Please try again.'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    checkoutProducts,
    currentOrder,
    error,
    loading,
    createOrder
  }
})