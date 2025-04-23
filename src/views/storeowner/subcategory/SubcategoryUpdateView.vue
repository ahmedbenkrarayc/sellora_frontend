<template>
    <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
      <Toast ref="toastRef" />
      <WelcomeMessage description="Edit your subcategory details quickly and safely!" />
  
      <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
        <div class="bg-white px-4 py-6 sm:px-8 md:px-12 lg:px-16 lg:py-12 rounded-lg">
          <h3 class="font-medium text-[19px] text-[#222222] mb-12">
            Update Subcategory
          </h3>
  
          <div class="mb-4">
            <label for="subcategory" class="text-[14px]">
              Subcategory Name <span class="text-red-600">*</span>
            </label>
            <input
              v-model="form.name"
              id="subcategory"
              type="text"
              placeholder="Ex: Smartphones"
              class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400"
            />
          </div>
  
          <div class="mb-4">
            <label for="status" class="text-[14px]">
              Subcategory Status <span class="text-red-600">*</span>
            </label>
            <select
              v-model="form.status"
              id="status"
              class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
  
          <div class="mb-4">
            <label for="category_id" class="text-[14px]">
              Category <span class="text-red-600">*</span>
            </label>
            <select
              v-model="form.category_id"
              id="category_id"
              class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400"
            >
              <option disabled value="">Select Category</option>
              <option
                v-for="cat in categoryStore.categories"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>
  
          <button
            type="button"
            @click="updateSubcategory"
            :disabled="loading"
            class="block mt-6 px-6 py-2 bg-[#493D9E] hover:bg-[#42369e] w-fit ml-auto text-white rounded-md text-[14px] font-medium"
          >
            {{ loading ? 'Updating...' : 'Update Subcategory' }}
          </button>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Toast from 'primevue/toast'
  import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
  import { useCategoryStore } from '@/stores/storeowner/category'
  import { useSubcategoryStore } from '@/stores/storeowner/subcategory'
  
  const toastRef = ref(null)
  const route = useRoute()
  
  const categoryStore = useCategoryStore()
  const subcategoryStore = useSubcategoryStore()
  
  const loading = ref(false)
  const form = ref({
    name: '',
    status: 'active',
    category_id: '',
  })
  
  const id = route.params.id
  
  onMounted(async () => {
    try {
      await categoryStore.fetchCategories()
  
      const data = await subcategoryStore.fetchSubcategory(id)
      form.value.name = data.name
      form.value.status = data.status
      form.value.category_id = data.category_id
    } catch (err) {
      toastRef.value.add({
        severity: 'error',
        summary: 'Load Error',
        detail: err.toString(),
        life: 3000,
      })
    }
  })
  
  const updateSubcategory = async () => {
    if (!form.value.name.trim()) {
      toastRef.value.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Name is required.',
        life: 3000,
      })
      return
    }
    if (!form.value.category_id) {
      toastRef.value.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Category must be selected.',
        life: 3000,
      })
      return
    }
  
    loading.value = true
    try {
      await subcategoryStore.updateSubcategory(id, { ...form.value })
      toastRef.value.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Subcategory updated successfully.',
        life: 3000,
      })
    } catch (err) {
      toastRef.value.add({
        severity: 'error',
        summary: 'Error',
        detail: err.toString(),
        life: 4000,
      })
    } finally {
      loading.value = false
    }
  }
</script>
  