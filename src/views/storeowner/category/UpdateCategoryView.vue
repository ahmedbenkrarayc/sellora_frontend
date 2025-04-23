<template>
    <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
      <Toast ref="toastRef" />
      <WelcomeMessage description="Update your category details and keep things fresh!" />
  
      <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
        <div class="bg-white px-4 py-6 sm:px-8 md:px-12 lg:px-16 lg:py-12 rounded-lg">
          <h3 class="font-medium text-[19px] text-[#222222] mb-12">Update category</h3>
  
          <div class="mb-4">
            <label for="category" class="text-[14px]">Category Name <span class="text-red-600">*</span></label>
            <input
              v-model="form.name"
              id="category"
              class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400"
              type="text"
              placeholder="Category name"
            />
          </div>
  
          <div class="mb-4">
            <label for="status" class="text-[14px]">Category Status <span class="text-red-600">*</span></label>
            <select
              v-model="form.status"
              id="status"
              class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
  
          <div class="mb-4">
            <label for="store_id" class="text-[14px]">Store</label>
            <input
              id="store_id"
              class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent"
              type="text"
              :value="storeStore.storeData.name"
              disabled
            />
          </div>
  
          <button
            @click="updateCategory"
            :disabled="categoryStore.loading"
            class="block mt-6 px-6 py-2 bg-[#493D9E] hover:bg-[#42369e] w-fit ml-auto text-white rounded-md text-[14px] font-medium"
          >
            {{ categoryStore.loading ? 'Updating...' : 'Update category' }}
          </button>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useCategoryStore } from '@/stores/storeowner/category'
  import { useStoreStore } from '@/stores/store'
  import Toast from 'primevue/toast'
  import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
  
  const toastRef = ref()
  const route = useRoute()
  const router = useRouter()
  
  const categoryStore = useCategoryStore()
  const storeStore = useStoreStore()
  
  const form = ref({
    id: null,
    name: '',
    status: 'active',
    store_id: storeStore.storeData.id,
  })
  
  const loadCategory = async () => {
    try {
      const id = route.params.id
      const category = await categoryStore.fetchCategory(id)
    
      form.value = { ...category }
    } catch (err) {
      toastRef.value.add({ severity: 'error', summary: 'Error', detail: 'Failed to load category.', life: 3000 })
      router.push('/dashboard/categories')
    }
  }
  
  const updateCategory = async () => {
    if (!form.value.name.trim()) {
      toastRef.value.add({ severity: 'error', summary: 'Validation Error', detail: 'Category name is required.', life: 3000 })
      return
    }
  
    try {
      await categoryStore.updateCategory(form.value.id, { ...form.value })
      toastRef.value.add({ severity: 'success', summary: 'Success', detail: 'Category updated successfully.', life: 3000 })
    } catch (err) {
      toastRef.value.add({ severity: 'error', summary: 'Update Failed', detail: err.message || 'Something went wrong.', life: 4000 })
    }
  }
  
  onMounted(() => {
    loadCategory()
  })
  </script>
  