<template>
    <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
      <!-- Confirmation Modal -->
      <transition name="fade">
        <div
          v-if="showConfirmModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 mx-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 text-center">
              Delete Subcategory
            </h3>
            <p class="text-gray-600 text-center mb-6">
              Are you sure you want to delete this subcategory? This action cannot
              be undone.
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
  
      <WelcomeMessage description="Manage your subcategories effortlessly and stay ahead!" />
  
      <!-- Search Bar -->
      <div class="my-8 px-4 sm:px-0">
        <div
          class="flex items-center gap-2 bg-white px-4 py-2 w-full sm:w-fit sm:ml-auto rounded-md border border-gray-300 max-w-full sm:max-w-[250px] mx-auto sm:mx-0"
        >
          <img class="w-4 h-4" src="@/assets/images/search.svg" alt="search icon" />
          <input
            v-model="search"
            @input="filterList"
            class="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
  
      <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
        <!-- Loading / Empty -->
        <div v-if="subcategoryStore.loading" class="text-center py-8">Loading...</div>
        <div
          v-else-if="filtered.length === 0"
          class="text-center text-gray-500 py-8"
        >
          No subcategories found.
        </div>
  
        <!-- List -->
        <div
          v-for="sc in paginated"
          :key="sc.id"
          class="bg-white rounded-lg shadow-sm mb-4 p-4"
        >
          <div
            class="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left md:space-x-6 space-y-4 md:space-y-0"
          >
            <!-- Subcategory & Store -->
            <div class="flex flex-col items-center md:flex-row md:items-center md:gap-4 gap-2">
              <img
                class="size-12 block"
                src="@/assets/images/subcategoryicon.svg"
                alt="subcategory icon"
              />
              <div>
                <p class="font-medium text-gray-800">{{ sc.name }}</p>
                <p class="text-sm text-gray-500">
                  {{ storeStore.storeData.subdomain }}.sellora.local
                </p>
              </div>
            </div>
  
            <!-- Category Name -->
            <div class="text-sm text-gray-500">
              {{ getCategoryName(sc.category_id) }}
            </div>
  
            <!-- Status -->
            <div class="flex justify-center md:justify-start">
              <span
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-full',
                  sc.status === 'active'
                    ? 'text-green-700 bg-green-100'
                    : 'text-red-700 bg-red-100'
                ]"
              >
                {{ sc.status }}
              </span>
            </div>
  
            <!-- Created Date -->
            <div class="text-sm text-gray-500">
              {{ sc.created_at ? formatDate(sc.created_at) : '-' }}
            </div>
  
            <!-- Actions -->
            <div class="flex flex-col items-center gap-2 md:flex-row md:justify-end md:gap-3">
              <button
                @click="goToEdit(sc.id)"
                class="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                @click="showConfirmModalHandler(sc.id)"
                class="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
  
        <!-- Pagination -->
        <div v-if="filtered.length > limit" class="mt-6 flex justify-center gap-2">
          <button
            @click="prevPage"
            :disabled="page <= 1"
            class="px-4 py-1 rounded bg-gray-200"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="endIndex >= filtered.length"
            class="px-4 py-1 rounded bg-gray-200"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  </template>
  
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
import { useSubcategoryStore } from '@/stores/storeowner/subcategory'
import { useCategoryStore } from '@/stores/storeowner/category'
import { useStoreStore } from '@/stores/store'
  
const router = useRouter()
const subcategoryStore = useSubcategoryStore()
const categoryStore = useCategoryStore()
const storeStore = useStoreStore()
  
const search = ref('')
const page = ref(1)
const limit = 10
  
const showConfirmModal = ref(false)
const subcategoryToDelete = ref(null)

onMounted(async () => {
    await categoryStore.fetchCategories()
    await subcategoryStore.fetchSubcategories()
})
  
const filtered = computed(() => {
    const term = search.value.trim().toLowerCase()
    const list = subcategoryStore.subcategories
    if (!term) return list
    return list.filter((sc) => {
        const subN = sc.name.toLowerCase()
        const cat = categoryStore.categories.find((c) => c.id === sc.category_id)
        const catN = cat?.name.toLowerCase() || ''
        return subN.includes(term) || catN.includes(term)
    })
})
  
const startIndex = computed(() => (page.value - 1) * limit)
const endIndex = computed(() => page.value * limit)
const paginated = computed(() =>
    filtered.value.slice(startIndex.value, endIndex.value)
)
  
function filterList() {
    page.value = 1
}

function nextPage() {
    if (endIndex.value < filtered.value.length) page.value++
}

function prevPage() {
    if (page.value > 1) page.value--
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-GB')
}
  
function getCategoryName(id) {
    const c = categoryStore.categories.find((c) => c.id === id)
    return c ? c.name : 'Unknown'
}

function goToEdit(id) {
    router.push(`/storeowner/subcategory/update/${id}`)
}

function showConfirmModalHandler(id) {
    subcategoryToDelete.value = id
    showConfirmModal.value = true
}

function cancelDelete() {
    showConfirmModal.value = false
    subcategoryToDelete.value = null
}

async function confirmDelete() {
    try {
        await subcategoryStore.deleteSubcategory(subcategoryToDelete.value)
        await subcategoryStore.fetchSubcategories()
    } finally {
        cancelDelete()
    }
}
</script>
  
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
  