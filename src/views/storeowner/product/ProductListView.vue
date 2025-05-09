<template>
    <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
      <transition name="fade">
        <div
          v-if="showConfirmModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 mx-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 text-center">Delete Product</h3>
            <p class="text-gray-600 text-center mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div class="flex justify-end gap-3">
              <button
                @click="cancelDelete"
                class="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                @click="confirmDelete"
                class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </transition>
  
      <WelcomeMessage description="Manage your products effortlessly and stay ahead!" />
  
      <div class="my-8 px-4 sm:px-0">
        <div class="flex items-center gap-2 bg-white px-4 py-2 w-full sm:w-fit sm:ml-auto rounded-md border border-gray-300 max-w-full sm:max-w-[250px] mx-auto sm:mx-0">
          <img class="w-4 h-4" src="@/assets/images/search.svg" alt="search icon" />
          <input
            v-model="search"
            @input="filterProducts"
            class="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
  
      <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
        <div v-if="productStore.loading">Loading...</div>
        <div v-else-if="filteredProducts.length === 0" class="text-center text-gray-500">No products found.</div>
  
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-sm mb-4 p-4"
        >
          <div class="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left md:space-x-6 space-y-4 md:space-y-0">
            <div class="flex flex-col items-center md:flex-row md:items-center md:gap-4 gap-2">
              <img class="size-12 block" src="@/assets/images/categoryicon.svg" alt="product icon">
              <div>
                <p class="font-medium text-gray-800">{{ product.title }}</p>
              </div>
            </div>
            <div class="text-sm text-gray-800">{{ product.baseprice || product.variants[0].price }}$</div>
            <div class="text-sm text-gray-800">{{ product.variants?.length || '0' }} variants</div>
            <div class="text-sm text-gray-500">{{ product.created_at ? formatDate(product.created_at) : 'N/A' }}</div>
            <div class="flex flex-col items-center gap-2 md:flex-row md:justify-end md:gap-3">
              <button @click="goToEdit(product.id)" class="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
              <button
                class="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800"
                @click="showConfirmModalHandler(product.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
  
        <div v-if="filteredProducts.length > limit" class="mt-6 flex justify-center gap-2">
          <button @click="prevPage" :disabled="page <= 1" class="px-4 py-1 rounded bg-gray-200">Previous</button>
          <button @click="nextPage" :disabled="endIndex >= filteredProducts.length" class="px-4 py-1 rounded bg-gray-200">Next</button>
        </div>
      </section>
    </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue'
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
import { useProductStore } from '@/stores/storeowner/product'
import { useStoreStore } from '@/stores/store'
import { useRouter } from 'vue-router'
  
const router = useRouter()
const goToEdit = (id) => {
    router.push(`/storeowner/product/update/${id}`)
}

const productStore = useProductStore()
const storeStore = useStoreStore()

const search = ref('')
const page = ref(1)
const limit = 10

const showConfirmModal = ref(false)
const productToDelete = ref(null)
  
const filteredProducts = computed(() =>
    productStore.storeProducts.filter(product =>
    product.title.toLowerCase().includes(search.value.trim().toLowerCase())
))

const startIndex = computed(() => (page.value - 1) * limit)
const endIndex = computed(() => page.value * limit)
const paginatedProducts = computed(() =>
    filteredProducts.value.slice(startIndex.value, endIndex.value)
)
  
const filterProducts = () => {
    page.value = 1
}

const nextPage = () => {
    if (endIndex.value < filteredProducts.value.length) {
    page.value++
    }
}

const prevPage = () => {
    if (page.value > 1) {
    page.value--
    }
}
  
const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString()
}

const showConfirmModalHandler = (id) => {
    productToDelete.value = id
    showConfirmModal.value = true
}

const cancelDelete = () => {
    showConfirmModal.value = false
    productToDelete.value = null
}
  
const confirmDelete = async () => {
    try {
    await productStore.deleteProduct(productToDelete.value)
    await productStore.getStoreProducts(storeStore.storeData.id)
    } catch (error) {
    console.error(error)
    } finally {
    cancelDelete()
    }
}

onMounted(async () => {
    await productStore.getStoreProducts(storeStore.storeData.id)
})
</script>
  
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>