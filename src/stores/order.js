import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useOrderStore = defineStore('order', () => {
  const checkoutProducts = ref([])
  const currentOrder = ref(null)
  const orders = ref([])
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

  const fetchStoreOrders = async (storeId) => {
    loading.value = true
    error.value = null
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.get(`${apiUrl}/orders/store/${storeId}`, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.status === 200) {
        orders.value = response.data.map(order => ({
          id: `order${order.id}`,
          originalId: order.id,
          customer_id: order.customer_id,
          customer: order.customer ? {
            id: order.customer.id,
            name: `${order.customer.user?.fname || ''} ${order.customer.user?.lname || ''}`.trim(),
            email: order.customer.user?.email || ''
          } : null,
          address: {
            street: order.address,
            city: order.city,
            country: order.country,
            postal: order.postalcode
          },
          items: order.productvariants.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.pivot.quantity,
            price: item.price,
            images: item.images || []
          })),
          price: order.price,
          date: new Date(order.created_at).toLocaleDateString(),
          status: order.status
        }))
        return orders.value
      }
      throw new Error('Failed to fetch orders')
    } catch (err) {
      error.value = err.response?.data?.message || 
                  err.response?.data?.errors || 
                  err.message || 
                  'Failed to load orders. Please try again.'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    loading.value = true
    error.value = null
    
    try {
      const order = orders.value.find(o => o.id === orderId)
      if (!order) throw new Error('Order not found')

      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.put(
        `${apiUrl}/orders/${order.originalId}`,
        { status: newStatus },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      )

      if (response.status === 200) {
        order.status = newStatus
        return response.data
      }
      throw new Error('Failed to update order status')
    } catch (err) {
      error.value = err.response?.data?.message || 
                  err.response?.data?.errors || 
                  err.message || 
                  'Failed to update order status. Please try again.'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    checkoutProducts,
    currentOrder,
    orders,
    error,
    loading,
    createOrder,
    fetchStoreOrders,
    updateOrderStatus
  }
})