import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistItems = ref([])
  const loading = ref(false)
  const error = ref(null)

  const normalizeItem = (item) => {
    return {
      id: item.id,
      productvariant_id: item.productvariant_id,
      name: item.productvariant?.product?.title || '',
      price: item.productvariant?.price || 0,
      image: item.productvariant?.images?.[0]?.path || '',
      quantity: 1
    }
  }

  const loadWishlist = async (user) => {
    loading.value = true
    try {
      if (user && user.role === 'customer') {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await axios.get(`${apiUrl}/wishlist/${user.id}`, {
          withCredentials: true,
        })
        
        wishlistItems.value = response.data.map(normalizeItem)
      } else {
        const localItems = localStorage.getItem('wishlist')
        wishlistItems.value = localItems ? JSON.parse(localItems) : []
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const addItem = async (user, payload) => {
    try {
      if (user && user.role === 'customer') {
        const apiUrl = import.meta.env.VITE_API_URL
        await axios.post(`${apiUrl}/wishlist`, {
          customer_id: user.id,
          productvariant_id: payload.productvariant_id
        }, {
          withCredentials: true,
        })
        await loadWishlist(user)
      } else {
        const localItems = localStorage.getItem('wishlist')
        let items = localItems ? JSON.parse(localItems) : []

        const exists = items.find(item => item.id === payload.id)
        if (!exists) {
          items.push(payload)
          localStorage.setItem('wishlist', JSON.stringify(items))
        }
        wishlistItems.value = items
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Unknown error'
    }
  }

  const removeItem = async (user, itemId) => {
    try {
      if (user && user.role === 'customer') {
        const apiUrl = import.meta.env.VITE_API_URL
        await axios.delete(`${apiUrl}/wishlist/${itemId}`, {
          withCredentials: true,
        })
        await loadWishlist(user)
      } else {
        const localItems = localStorage.getItem('wishlist')
        let items = localItems ? JSON.parse(localItems) : []
        items = items.filter(item => item.id !== itemId)
        localStorage.setItem('wishlist', JSON.stringify(items))
        wishlistItems.value = items
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Unknown error'
    }
  }

  const mergeLocalToDatabase = async (user) => {
    try {
      if (user && user.role === 'customer') {
        const localItems = localStorage.getItem('wishlist')
        let items = localItems ? JSON.parse(localItems) : []

        for (const item of items) {
          await axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, {
            customer_id: user.id,
            productvariant_id: item.productvariant_id
          }, {
            withCredentials: true,
          })
        }
        localStorage.removeItem('wishlist')
        await loadWishlist(user)
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Unknown error'
    }
  }

  return {
    wishlistItems,
    loading,
    error,
    loadWishlist,
    addItem,
    removeItem,
    mergeLocalToDatabase,
  }
})