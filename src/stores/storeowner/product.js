import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const loading = ref(false)
  const error = ref(null)
  const currentProduct = ref(null)
  const storeProducts = ref([])

  const getProductById = async (productId) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${apiUrl}/products/${productId}`, { withCredentials: true })
      currentProduct.value = response.data.data
      loading.value = false
      return currentProduct.value
    } catch (err) {
      loading.value = false
      error.value = err.response?.data?.message || 'Something went wrong'
      throw err
    }
  }

  const createFullProduct = async (productPayload) => {
    loading.value = true
    error.value = null

    try {
      const productRes = await axios.post(
        `${apiUrl}/products`,
        {
          title: productPayload.title,
          description: productPayload.description,
          baseprice: productPayload.baseprice,
          subcategory_id: productPayload.subcategory_id,
        },
        { withCredentials: true }
      )
      const productId = productRes.data.id

      await saveProductParts(productId, productPayload)
      loading.value = false
      return productRes.data
    } catch (err) {
      loading.value = false
      error.value = err.response?.data?.message || 'Something went wrong'
      throw err
    }
  }

  const updateFullProduct = async (productId, productPayload) => {
    loading.value = true
    error.value = null

    try {
      await axios.put(
        `${apiUrl}/products/${productId}`,
        {
          title: productPayload.title,
          description: productPayload.description,
          baseprice: productPayload.baseprice,
          subcategory_id: productPayload.subcategory_id,
        },
        { withCredentials: true }
      )

      await axios.delete(`${apiUrl}/productdetails/by-product/${productId}`, { withCredentials: true })
      await axios.delete(`${apiUrl}/sizes/by-product/${productId}`, { withCredentials: true })
      await axios.delete(`${apiUrl}/colors/by-product/${productId}`, { withCredentials: true })
      await axios.delete(`${apiUrl}/productvariants/by-product/${productId}`, { withCredentials: true })

      await saveProductParts(productId, productPayload)

      loading.value = false
    } catch (err) {
      loading.value = false
      error.value = err.response?.data?.message || 'Something went wrong'
      throw err
    }
  }

  const saveProductParts = async (productId, productPayload) => {
    for (const detail of productPayload.details) {
      await axios.post(
        `${apiUrl}/productdetails`,
        {
          key: detail.key,
          value: detail.value,
          product_id: productId,
        },
        { withCredentials: true }
      )
    }

    const sizeIds = []
    for (const size of productPayload.sizes) {
      const sizeRes = await axios.post(
        `${apiUrl}/sizes`,
        {
          name: size,
          product_id: productId,
        },
        { withCredentials: true }
      )
      sizeIds.push({ id: sizeRes.data.data.id, name: sizeRes.data.data.name })
    }

    const colorIds = []
    for (const color of productPayload.colors) {
      const colorRes = await axios.post(
        `${apiUrl}/colors`,
        {
          name: color,
          product_id: productId,
        },
        { withCredentials: true }
      )
      colorIds.push({ id: colorRes.data.data.id, name: colorRes.data.data.name })
    }

    for (const variant of productPayload.variants) {
      const variantRes = await axios.post(
        `${apiUrl}/productvariants`,
        {
          name: productPayload.title + ' ' + variant.size + '-' + variant.color,
          stock: variant.stock,
          price: variant.price,
          available: variant.availability,
          product_id: productId,
          size_id: sizeIds.find(item => item.name === variant.size)?.id,
          color_id: colorIds.find(item => item.name === variant.color)?.id,
        },
        { withCredentials: true }
      )

      const variantId = variantRes.data.id

      for (const image of variant.images) {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('productvariant_id', variantId)

        await axios.post(`${apiUrl}/productvariantimages`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
      }
    }
  }

  const getStoreProducts = async (storeId) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${apiUrl}/products/store/${storeId}`, { 
        withCredentials: true 
      })
      storeProducts.value = response.data.data
      loading.value = false
      return storeProducts.value
    } catch (err) {
      loading.value = false
      error.value = err.response?.data?.message || 'Something went wrong'
      throw err
    }
  }

  return {
    loading,
    error,
    currentProduct,
    getProductById,
    createFullProduct,
    updateFullProduct,
    getStoreProducts,
    storeProducts
  }
})
