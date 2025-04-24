<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
    <Toast ref="toastRef" />
    <WelcomeMessage description="Manage your store effortlessly and stay ahead!" />

    <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
      <div class="bg-white px-4 py-6 sm:px-8 md:px-12 lg:px-16 lg:py-12 rounded-lg">
        <h3 class="font-medium text-[19px] text-[#222222] mb-12">Manage Store</h3>

        <div v-if="storeStore.error && !isObjectError" class="text-red-600 text-center py-4 mb-6">
          {{ storeStore.error }}
        </div>

        <div>
          <div v-if="globalErrors.length" class="mb-6 border border-red-300 bg-red-50 p-4 rounded">
            <ul class="list-disc pl-5 text-red-700">
              <li v-for="(msg, i) in globalErrors" :key="i">{{ msg }}</li>
            </ul>
          </div>

          <div class="mb-4">
            <label for="name" class="text-[14px]">
              Name <span class="text-red-600">*</span>
            </label>
            <div v-if="storeStore.loading" class="mt-2 px-4 py-2 border-2 rounded-md w-full bg-gray-100 animate-pulse h-10"></div>
            <input
              v-else
              id="name"
              v-model="form.name"
              :class="inputClass(formErrors.name)"
              type="text"
              placeholder="Store name"
            />
            <p v-if="formErrors.name" class="text-red-600 text-[12px]">
              {{ formErrors.name }}
            </p>
          </div>

          <div class="mb-4">
            <label for="subdomain" class="text-[14px]">
              Subdomain <span class="text-red-600">*</span>
            </label>
            <div v-if="storeStore.loading" class="mt-2 px-4 py-2 border-2 rounded-md w-full bg-gray-100 animate-pulse h-10"></div>
            <input
              v-else
              id="subdomain"
              v-model="form.subdomain"
              :class="inputClass(formErrors.subdomain)"
              type="text"
              placeholder="store1.sellora.local"
              disabled
            />
            <p v-if="formErrors.subdomain" class="text-red-600 text-[12px]">
              {{ formErrors.subdomain }}
            </p>
          </div>

          <div class="mb-4">
            <label for="type" class="text-[14px]">
              Type <span class="text-red-600">*</span>
            </label>
            <div v-if="storeStore.loading" class="mt-2 px-4 py-2 border-2 rounded-md w-full bg-gray-100 animate-pulse h-10"></div>
            <input
              v-else
              id="type"
              v-model="form.type"
              :class="inputClass(formErrors.type)"
              type="text"
              placeholder="e.g. Electronics"
            />
            <p v-if="formErrors.type" class="text-red-600 text-[12px]">
              {{ formErrors.type }}
            </p>
          </div>

          <div class="mb-4">
            <label class="text-[14px]">Logo</label>
            <div v-if="storeStore.loading" class="mt-2 px-4 py-2 border-2 rounded-md w-full bg-gray-100 animate-pulse h-10"></div>
            <div v-else class="flex items-center space-x-4">
              <label
                for="logo"
                class="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-[14px] hover:bg-gray-100"
              >
                Choose file
              </label>
              <span class="text-[14px]">{{ logoName || 'No file chosen' }}</span>
            </div>
            <input
              id="logo"
              ref="logoInput"
              @change="onLogoChange"
              class="hidden"
              type="file"
              accept="image/*"
            />
            <p v-if="formErrors.logo" class="text-red-600 text-[12px]">
              {{ formErrors.logo }}
            </p>
          </div>

          <div class="mb-4">
            <label for="description" class="text-[14px]">Description</label>
            <div v-if="storeStore.loading" class="mt-2 px-4 py-2 border-2 rounded-md w-full bg-gray-100 animate-pulse h-32"></div>
            <textarea
              v-else
              id="description"
              v-model="form.description"
              class="block h-[150px] resize-none mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400"
              placeholder="Ex: electronics"
            ></textarea>
            <p v-if="formErrors.description" class="text-red-600 text-[12px]">
              {{ formErrors.description }}
            </p>
          </div>

          <button
            :disabled="!isValid || storeStore.loading"
            @click="save"
            class="block mt-6 px-6 py-2 bg-[#493D9E] hover:bg-[#42369e] disabled:opacity-50 w-fit ml-auto text-white rounded-md text-[14px] font-medium"
          >
            <span v-if="storeStore.loading">Loading…</span>
            <span v-else>Save changes</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
import { useStoreStore } from '@/stores/store'
import Toast from 'primevue/toast'
const toastRef = ref(null)

const storeStore = useStoreStore()

const form = reactive({
  name: '',
  subdomain: '',
  type: '',
  description: '',
  logo: null
})
const logoName = ref('')

const formErrors = reactive({ name: '', subdomain: '', type: '', description: '', logo: '' })
const globalErrors = ref([])
const isObjectError = computed(() => typeof storeStore.error === 'object' && storeStore.error !== null)

watchEffect(() => {
  if (!storeStore.loading && storeStore.storeData) {
    form.name = storeStore.storeData.name
    form.subdomain = storeStore.storeData.subdomain
    form.type = storeStore.storeData.type
    form.description = storeStore.storeData.description
    form.status = storeStore.storeData.status
    form.storeowner_id = storeStore.storeData.storeowner_id
  }
})

watch(
  () => storeStore.error,
  (err) => {
    Object.keys(formErrors).forEach((k) => (formErrors[k] = ''))
    globalErrors.value = []

    if (isObjectError.value) {
      for (const [field, msgs] of Object.entries(err)) {
        if (field in formErrors) {
          formErrors[field] = Array.isArray(msgs) ? msgs[0] : msgs
        } else {
          globalErrors.value.push(...(Array.isArray(msgs) ? msgs : [msgs]))
        }
      }
    }
  },
  { immediate: true }
)

const validate = () => {
  formErrors.name = form.name ? '' : 'Name is required.'
  formErrors.subdomain = form.subdomain ? '' : 'Subdomain is required.'
  formErrors.type = form.type ? '' : 'Type is required.'
}
const isValid = computed(() => {
  validate()
  return (
    !formErrors.name &&
    !formErrors.subdomain &&
    !formErrors.type &&
    !storeStore.loading
  )
})

const logoInput = ref(null)
const onLogoChange = () => {
  const file = logoInput.value.files[0]
  if (file) {
    form.logo = file
    logoName.value = file.name
  } else {
    form.logo = null
    logoName.value = ''
  }
}

const save = async () => {
  if (!isValid.value) return
  await storeStore.updateStore(storeStore.storeData.id, form)
  if (!storeStore.error) {
    toastRef.value.add({ severity: 'success', summary: 'Success', detail: 'Store updated successfully!', life: 3000 })
  }
}

const inputClass = (error) =>
  `block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400 ${
    error ? 'border-red-500' : ''
  }`
</script>
