<template>
    <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
      <Toast ref="toastRef" />
      <WelcomeMessage description="Create your subcategories effortlessly and stay ahead!" />
  
      <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
        <div class="bg-white px-4 py-6 sm:px-8 md:px-12 lg:px-16 lg:py-12 rounded-lg">
          <h3 class="font-medium text-[19px] text-[#222222] mb-12">Create new subcategory</h3>
  
          <div class="mb-4">
            <label for="subcategory" class="text-[14px]">
              Subcategory Name <span class="text-red-600">*</span>
            </label>
            <input
              v-model="form.name"
              id="subcategory"
              class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400"
              type="text"
              placeholder="Ex: Smartphones"
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
            @click="saveSubcategory"
            :disabled="subcategoryStore.loading"
            class="block mt-6 px-6 py-2 bg-[#493D9E] hover:bg-[#42369e] w-fit ml-auto text-white rounded-md text-[14px] font-medium"
          >
            {{ subcategoryStore.loading ? 'Saving...' : 'Save subcategory' }}
          </button>
        </div>
      </section>
    </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue'
import Toast from 'primevue/toast'
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
import { useCategoryStore } from '@/stores/storeowner/category'
import { useSubcategoryStore } from '@/stores/storeowner/subcategory'

const toastRef = ref(null)
const categoryStore = useCategoryStore()
const subcategoryStore = useSubcategoryStore()

const form = ref({
    name: '',
    status: 'active',
    category_id: ''
})

onMounted(async () => {
    try {
        await categoryStore.fetchCategories()
    } catch (err) {
        toastRef.value.add({ severity: 'error', summary: 'Error', detail: err.toString(), life: 3000 })
    }
})

const saveSubcategory = async () => {
    if (!form.value.name.trim()) {
        toastRef.value.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Subcategory name is required.',
            life: 3000,
        })
        return
    }

    if (!form.value.category_id) {
        toastRef.value.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Parent category is required.',
            life: 3000,
        })
        return
    }

    try {
        await subcategoryStore.createSubcategory(form.value)
        toastRef.value.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Subcategory created successfully.',
            life: 3000,
        })

        form.value.name = ''
        form.value.status = 'active'
        form.value.category_id = ''
    } catch (error) {
        toastRef.value.add({ severity: 'error', summary: 'Error', detail: error.toString(), life: 4000 })
    }
}
</script>
  