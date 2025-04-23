<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
      <Toast ref="toastRef" />
      <WelcomeMessage description="Manage your categories effortlessly and stay ahead!" />
    
      <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
          <div class="bg-white px-4 py-6 sm:px-8 md:px-12 lg:px-16 lg:py-12 rounded-lg">
            <h3 class="font-medium text-[19px] text-[#222222] mb-12">Create new category</h3>
          
            <div class="mb-4">
                <label for="category" class="text-[14px]">Category Name <span class="text-red-600">*</span></label>
                <input v-model="form.name" id="category" class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400" type="text" placeholder="Ex: electronics" />
            </div>
          
            <div class="mb-4">
                <label for="status" class="text-[14px]">Category Status <span class="text-red-600">*</span></label>
                <select v-model="form.status" id="status" class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
  
            <div class="mb-4">
                <label for="store_id" class="text-[14px]">Store</label>
                <input id="store_id" class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400" type="text" :value="storeStore.storeData.name" disabled />
            </div>
        
            <button @click="saveCategory" :disabled="categoryStore.loading" class="block mt-6 px-6 py-2 bg-[#493D9E] hover:bg-[#42369e] w-fit ml-auto text-white rounded-md text-[14px] font-medium">
                {{ categoryStore.loading ? 'Saving...' : 'Save category' }}
            </button>
          </div>
      </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Toast from 'primevue/toast'
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
import { useCategoryStore } from '@/stores/storeowner/category'
import { useStoreStore } from '@/stores/store'


const store = window.location.hostname.split('.')[0].toLowerCase()
const toastRef = ref()
const categoryStore = useCategoryStore()
const storeStore = useStoreStore()

const form = ref({
  name: '',
  status: 'active',
  store_id: storeStore.storeData.id
})

const saveCategory = async () => {
  if (!form.value.name.trim()) {
    toastRef.value.add({ severity: 'error', summary: 'Validation Error', detail: 'Category name is required.', life: 3000 })
    return
  }

  try {
    await categoryStore.createCategory(form.value)
    toastRef.value.add({ severity: 'success', summary: 'Success', detail: 'Category created successfully.', life: 3000 })
    form.value.name = ''
    form.value.status = 'active'
  } catch (error) {
    toastRef.value.add({ severity: 'error', summary: 'Error', detail: error, life: 4000 })
  }
}
</script>
  