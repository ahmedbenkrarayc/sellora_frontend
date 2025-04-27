<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
    <Toast ref="toast" />
    <h1 class="font-semibold text-[18px] md:text-[20px] text-[#222222]">Welcome back, Ahmed</h1>
    <h2 class="text-[13px] md:text-[14px] text-[#636363]">Manage your products effortlessly and stay ahead!</h2>
    
    <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
      <div class="bg-white px-4 py-6 sm:px-8 md:px-12 lg:px-16 lg:py-12 rounded-lg">
          <h3 class="font-medium text-[19px] text-[#222222] mb-12">Create new product</h3>
      
          <div class="mb-4">
              <label for="title" class="text-[14px]">Title <span class="text-red-600">*</span></label>
              <input 
                id="title" 
                v-model="title" 
                :class="[
                  'block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400',
                  validationErrors.title ? 'border-red-500' : ''
                ]"
                type="text" 
                placeholder="Ex: hoodie" 
              />
              <div v-if="validationErrors.title" class="text-red-500 text-xs mt-1">
                {{ validationErrors.title }}
              </div>
          </div>

          <div class="mb-4">
              <label for="baseprice" class="text-[14px]">Base price <span class="text-red-600">*</span></label>
              <input 
                id="baseprice" 
                v-model="basePrice"
                :class="[
                  'block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400',
                  validationErrors.baseprice ? 'border-red-500' : ''
                ]"
                type="number" 
                placeholder="$20" 
              />
              <div v-if="validationErrors.baseprice" class="text-red-500 text-xs mt-1">
                {{ validationErrors.baseprice }}
              </div>
          </div>

          <div class="mb-4">
              <label for="subcategory" class="text-[14px]">Category <span class="text-red-600">*</span></label>
              <select 
                id="subcategory" 
                v-model="subcategory_id" 
                :class="[
                  'block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400',
                  validationErrors.subcategory_id ? 'border-red-500' : ''
                ]"
              >
                <option value="0" disabled>Select a category</option>
                <option v-for="(item, index) in subcategoryStore.subcategories" :key="index" :value="item.id">{{ item.name }}</option>
              </select>
              <div v-if="validationErrors.subcategory_id" class="text-red-500 text-xs mt-1">
                {{ validationErrors.subcategory_id }}
              </div>
          </div>
          
          <div class="mb-4">
              <label for="description" class="text-[14px]">Description <span class="text-red-600">*</span></label>
              <textarea 
                id="description" 
                v-model="description" 
                :class="[
                  'block h-[150px] resize-none mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400',
                  validationErrors.description ? 'border-red-500' : ''
                ]"
                placeholder="Ex: electronics"
              ></textarea>
              <div v-if="validationErrors.description" class="text-red-500 text-xs mt-1">
                {{ validationErrors.description }}
              </div>
          </div>

          <h4 class="font-medium text-[19px] text-[#222222] mt-12 mb-8">Product options</h4>

          <div class="mb-8">
              <div class="flex items-center">
                  <label for="size" class="text-[14px]">Size <span class="text-red-600">*</span></label>
              </div>
              <div v-if="validationErrors.sizes" class="text-red-500 text-xs mt-1">
                {{ validationErrors.sizes }}
              </div>
              <div class="mt-2 space-y-6">
                  <div v-for="(s, i) in sizes" :key="i" class="relative mb-6">
                      <input 
                          v-model="sizes[i]" 
                          :class="[
                              'block px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400',
                              sizeErrors[i] ? 'border-red-500' : ''
                          ]"
                          type="text" 
                          placeholder="Ex: L" 
                      />

                      <button 
                          v-if="i > 0"
                          @click="removeSize(i)" 
                          class="absolute right-2 top-2 text-red-500"
                          type="button"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                      </button>
                      <div v-if="sizeErrors[i]" class="text-red-500 text-xs mt-1">
                          {{ sizeErrors[i] }}
                      </div>
                  </div>
              </div>

              <button
                  type="button"
                  class="mt-2 flex items-center text-sm text-[#493D9E] font-medium"
                  @click="addSize"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add size
              </button>
          </div>

          <div class="mb-8">
              <div class="flex items-center">
                  <label for="color" class="text-[14px]">Color <span class="text-red-600">*</span></label>
              </div>
              <div v-if="validationErrors.colors" class="text-red-500 text-xs mt-1">
                {{ validationErrors.colors }}
              </div>
              <div class="mt-2 space-y-6">
                  <div v-for="(c, i) in colors" :key="i" class="relative mb-6">
                      <input
                          v-model="colors[i]"
                          :class="[
                              'block px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400',
                              colorErrors[i] ? 'border-red-500' : ''
                          ]"
                          type="text"
                          placeholder="Ex: Red"
                      />

                      <button 
                          v-if="i > 0"
                          @click="removeColor(i)" 
                          class="absolute right-2 top-2 text-red-500"
                          type="button"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                      </button>
                      <div v-if="colorErrors[i]" class="text-red-500 text-xs mt-1">
                          {{ colorErrors[i] }}
                      </div>
                  </div>
              </div>
              <button
                  type="button"
                  class="mt-2 flex items-center text-sm text-[#493D9E] font-medium"
                  @click="addColor"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add color
              </button>
          </div>

          <h2 class="text-lg font-medium text-gray-800 mb-4 mt-8">Product variants</h2>
          
          <div v-if="productVariants.length === 0" class="text-gray-500 text-sm mb-4">
            Add sizes and colors to generate product variants
          </div>
          
          <div v-if="validationErrors.variants" class="text-red-500 text-xs mb-4">
            {{ validationErrors.variants }}
          </div>
          
          <div v-for="(sizeGroup, sizeIndex) in groupedVariants" :key="sizeIndex" class="mb-8">
            <h3 class="font-medium text-gray-700 mb-2">Size: {{ sizeGroup.size }}</h3>
            
            <div class="space-y-4">
              <div v-for="(variant, variantIndex) in sizeGroup.variants" :key="variantIndex" class="flex items-center justify-between gap-4">
                  <div 
                    class="w-16 h-16 border border-dashed border-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    @click="openImageDialog(variant)"
                  >
                      <div v-if="variant.images && variant.images.length > 0" class="relative w-full h-full">
                        <img 
                          :src="variant.images[0].url" 
                          class="object-cover w-full h-full rounded" 
                          alt="Variant image"
                        />
                        <div 
                          v-if="variant.images.length > 1" 
                          class="absolute bottom-1 right-1 bg-gray-800 bg-opacity-60 text-white text-xs px-1 rounded"
                        >
                          +{{ variant.images.length - 1 }}
                        </div>
                      </div>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                  </div>
                  <div class="w-28">
                      <span class="text-sm text-gray-700">{{ variant.size }} - {{ variant.color }}</span>
                  </div>
                  <div class="w-40">
                      <input 
                        type="number" 
                        v-model="variant.price" 
                        placeholder="0.00 $" 
                        :class="[
                          'block mt-2 px-4 py-2 border-2 rounded-md w-full text-sm outline-none bg-transparent placeholder-gray-400',
                          getVariantError(variant, 'price') ? 'border-red-500' : ''
                        ]"
                      >
                      <div v-if="getVariantError(variant, 'price')" class="text-red-500 text-xs mt-1">
                        {{ getVariantError(variant, 'price') }}
                      </div>
                  </div>
                  <div class="w-40">
                      <input 
                        type="number" 
                        v-model="variant.stock" 
                        placeholder="stock" 
                        :class="[
                          'block mt-2 px-4 py-2 border-2 rounded-md w-full text-sm outline-none bg-transparent placeholder-gray-400',
                          getVariantError(variant, 'stock') ? 'border-red-500' : ''
                        ]"
                      >
                      <div v-if="getVariantError(variant, 'stock')" class="text-red-500 text-xs mt-1">
                        {{ getVariantError(variant, 'stock') }}
                      </div>
                  </div>
                  <div class="w-40 relative">
                      <select 
                        v-model="variant.availability"
                        :class="[
                          'block mt-2 px-4 py-2 border-2 rounded-md w-full text-sm outline-none bg-transparent text-gray-500 appearance-none',
                          getVariantError(variant, 'availability') ? 'border-red-500' : ''
                        ]"
                      >
                          <option value="" selected disabled>Availability</option>
                          <option value="1">Available</option>
                          <option value="0">Unavailable</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 mt-2 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                      </div>
                      <div v-if="getVariantError(variant, 'availability')" class="text-red-500 text-xs mt-1">
                        {{ getVariantError(variant, 'availability') }}
                      </div>
                  </div>
              </div>
            </div>
          </div>

          <h4 class="font-medium text-[19px] text-[#222222] mt-12 mb-8">Additional details</h4>
          
          <div class="mb-8">
              <div class="mt-2 space-y-6">
                  <div v-for="(detail, i) in additionalDetails" :key="i" class="mb-6">
                      <div class="relative mb-4">
                          <input 
                              v-model="additionalDetails[i].key" 
                              class="block px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400"
                              type="text" 
                              placeholder="Key" 
                          />

                          <button 
                              v-if="i > 0"
                              @click="removeDetail(i)" 
                              class="absolute right-2 top-2 text-red-500"
                              type="button"
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                          </button>
                      </div>

                      <div>
                          <input 
                              v-model="additionalDetails[i].value" 
                              class="block px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400"
                              type="text" 
                              placeholder="Value" 
                          />
                      </div>
                  </div>
              </div>

              <button
                  type="button"
                  class="mt-2 flex items-center text-sm text-[#493D9E] font-medium"
                  @click="addDetail"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add detail
              </button>
          </div>
      
          <button 
            @click="saveProduct" 
            :disabled="isSubmitting"
            :class="[
              'block mt-6 px-6 py-2 w-fit ml-auto text-white rounded-md text-[14px] font-medium',
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#493D9E] hover:bg-[#42369e]'
            ]"
          >
            <span v-if="isSubmitting">Saving...</span>
            <span v-else>Save product</span>
          </button>
      </div>
    </section>
    
    <Dialog 
      v-model:visible="imageDialogVisible" 
      :header="`Upload Images for ${selectedVariant?.size || ''} - ${selectedVariant?.color || ''}`"
      :modal="true"
      :closable="true"
      class="w-full md:w-3/4 lg:w-1/2"
    >
      <div class="p-4">
        <div v-if="selectedVariantImages.length > 0" class="mb-6">
          <h5 class="text-[16px] font-medium mb-3">Selected Images</h5>
          <div class="flex flex-wrap gap-4">
            <div 
              v-for="(image, index) in selectedVariantImages" 
              :key="index" 
              class="relative w-32 h-32 border rounded"
            >
              <img :src="image.url" class="w-full h-full object-cover rounded" :alt="`Variant image ${index + 1}`" />
              <div 
                v-if="index === 0" 
                class="absolute top-1 left-1 bg-[#493D9E] text-white text-xs px-2 py-1 rounded"
              >
                Main
              </div>
              <button 
                @click="removeImage(index)" 
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button 
                v-if="index !== 0" 
                @click="makeMainImage(index)" 
                class="absolute bottom-1 left-1 bg-[#493D9E] text-white rounded-full p-1 hover:bg-[#42369e]" 
                title="Set as main image"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h5 class="text-[16px] font-medium mb-3">Add New Images</h5>
          <div class="mb-4">
            <input 
              type="file" 
              ref="fileInput" 
              @change="onFileSelected" 
              multiple 
              accept="image/*" 
              class="hidden" 
            />
            <button 
              @click="triggerFileInput" 
              class="px-6 py-2 bg-[#493D9E] hover:bg-[#42369e] text-white rounded-md text-[14px] font-medium flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Select Images
            </button>
          </div>
          
          <div v-if="previewImages.length > 0" class="mb-4">
            <h6 class="text-[14px] font-medium mb-2">Images to upload:</h6>
            <div class="flex flex-wrap gap-3">
              <div 
                v-for="(preview, index) in previewImages" 
                :key="`preview-${index}`" 
                class="relative w-24 h-24 border rounded"
              >
                <img :src="preview.url" class="w-full h-full object-cover rounded" />
                <button 
                  @click="removePreviewImage(index)" 
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="previewImages.length > 0" class="mb-4">
            <button 
              @click="uploadSelectedImages" 
              class="px-6 py-2 bg-[#493D9E] hover:bg-[#42369e] text-white rounded-md text-[14px] font-medium"
            >
              Upload Selected Images
            </button>
          </div>
        </div>
        
        <div class="flex justify-end mt-4">
          <button 
            @click="closeImageDialog" 
            class="px-6 py-2 bg-[#493D9E] hover:bg-[#42369e] text-white rounded-md text-[14px] font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, reactive } from 'vue'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import { useSubcategoryStore } from '@/stores/storeowner/subcategory'
import { useProductStore } from '@/stores/storeowner/product'

const subcategoryStore = useSubcategoryStore()
const productStore = useProductStore()
const toast = ref()

onMounted(() => {
  subcategoryStore.fetchSubcategories()
})

const title = ref('')
const subcategory_id = ref(0)
const description = ref('')
const basePrice = ref(0)

const sizes = ref([''])
const colors = ref([''])
const additionalDetails = ref([{ key: '', value: '' }])
const productVariants = ref([])

const sizeErrors = ref([])
const colorErrors = ref([])
let validationErrors = reactive({})
const variantErrors = ref({})
const isSubmitting = ref(false)

const imageDialogVisible = ref(false)
const selectedVariant = ref(null)
const selectedVariantImages = ref([])
const previewImages = ref([])
const fileInput = ref(null)

function triggerFileInput() {
  fileInput.value.click()
}

function onFileSelected(event) {
  const files = event.target.files
  if (!files || files.length === 0) return

  const validFiles = []
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    
    if (!file.type.startsWith('image/')) {
      toast.value.add({ severity: 'error', summary: 'Invalid file', detail: `${file.name} is not an image file`, life: 3000 })
      continue
    }
    
    if (file.size > maxSize) {
      toast.value.add({ severity: 'error', summary: 'File too large', detail: `${file.name} exceeds 5MB limit`, life: 3000 })
      continue
    }
    
    validFiles.push(file)
  }

  for (const file of validFiles) {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      previewImages.value.push({
        name: file.name,
        url: e.target.result,
        size: file.size,
        file: file
      })
    }
    
    reader.readAsDataURL(file)
  }

  event.target.value = ''
}

function removePreviewImage(index) {
  previewImages.value.splice(index, 1)
}

function uploadSelectedImages() {
  if (previewImages.value.length === 0) return
  
  selectedVariantImages.value = [
    ...selectedVariantImages.value, 
    ...previewImages.value.map(preview => {
      return {
        name: preview.name,
        url: preview.url,
        size: preview.size,
        file: preview.file
      }
    })
  ]
  previewImages.value = []
  toast.value.add({ severity: 'success', summary: 'Images added', detail: 'Images have been added to the variant', life: 3000 })
}

function openImageDialog(variant) {
  selectedVariant.value = variant
  if (!variant.images) {
    variant.images = []
  }

  selectedVariantImages.value = [...variant.images]
  previewImages.value = []
  imageDialogVisible.value = true
}

function closeImageDialog() {
  if (selectedVariant.value) {
    selectedVariant.value.images = [...selectedVariantImages.value]
  }
  imageDialogVisible.value = false
  selectedVariant.value = null
  previewImages.value = []
}

function removeImage(index) {
  selectedVariantImages.value.splice(index, 1)
}

function makeMainImage(index) {
  const image = selectedVariantImages.value.splice(index, 1)[0]
  selectedVariantImages.value.unshift(image)
}

watch(sizes, (newSizes) => {
  validateSizes()
  generateVariants()
}, { deep: true })

watch(colors, (newColors) => {
  validateColors()
  generateVariants()
}, { deep: true })

function validateSizes() {
  sizeErrors.value = Array(sizes.value.length).fill('')

  sizes.value.forEach((size, index) => {
    if (!size.trim()) return
    
    const normalizedSize = size.trim().toLowerCase()
    
    for (let i = 0; i < sizes.value.length; i++) {
      if (i !== index && sizes.value[i].trim().toLowerCase() === normalizedSize) {
        sizeErrors.value[index] = "This size already exists"
        break
      }
    }
  })
}

function validateColors() {
  colorErrors.value = Array(colors.value.length).fill('')

  colors.value.forEach((color, index) => {
    if (!color.trim()) return
    
    const normalizedColor = color.trim().toLowerCase()
    
    for (let i = 0; i < colors.value.length; i++) {
      if (i !== index && colors.value[i].trim().toLowerCase() === normalizedColor) {
        colorErrors.value[index] = "This color already exists"
        break
      }
    }
  })
}

function addSize() {
  if (sizes.value.every((size, index) => size.trim() !== '' && !sizeErrors.value[index])) {
    sizes.value.push('')
    sizeErrors.value.push('')
  } else {
    toast.value.add({ severity: 'warn', summary: 'Validation Error', detail: 'Please fix existing size errors before adding a new one', life: 3000 })
  }
}

function addColor() {
  if (colors.value.every((color, index) => color.trim() !== '' && !colorErrors.value[index])) {
    colors.value.push('')
    colorErrors.value.push('')
  } else {
    toast.value.add({ severity: 'warn', summary: 'Validation Error', detail: 'Please fix existing color errors before adding a new one', life: 3000 })
  }
}

function addDetail() {
  additionalDetails.value.push({ key: '', value: '' })
}

function removeSize(index) {
  if (index > 0) {
    sizes.value.splice(index, 1)
    sizeErrors.value.splice(index, 1)
    generateVariants()
  }
}

function removeColor(index) {
  if (index > 0) {
    colors.value.splice(index, 1)
    colorErrors.value.splice(index, 1)
    generateVariants()
  }
}

function removeDetail(index) {
  if (index > 0) {
    additionalDetails.value.splice(index, 1)
  }
}

function generateVariants() {
  const validSizes = sizes.value.filter((size, index) => 
    size.trim() && !sizeErrors.value[index]
  )

  const validColors = colors.value.filter((color, index) => 
    color.trim() && !colorErrors.value[index]
  )

  const newVariants = []

  if (validSizes.length && validColors.length) {
    validSizes.forEach(size => {
      validColors.forEach(color => {
        const existingVariant = productVariants.value.find(v => 
          v.size === size && v.color === color
        )
        
        if (existingVariant) {
          newVariants.push(existingVariant)
        } else {
          newVariants.push({
            size,
            color,
            price: '',
            stock: '',
            availability: '',
            images: []
          })
        }
      })
    })
  }

  productVariants.value = newVariants
}

const groupedVariants = computed(() => {
  const groups = []

  const uniqueSizes = [...new Set(productVariants.value.map(v => v.size))]

  uniqueSizes.forEach(size => {
    const variants = productVariants.value.filter(v => v.size === size)
    groups.push({
      size,
      variants
    })
  })

  return groups
})

function getVariantError(variant, field) {
  const key = `${variant.size}-${variant.color}-${field}`
  return variantErrors.value[key] || ''
}

function validateForm() {
  let isValid = true
  validationErrors.title = ''
  validationErrors.description = ''
  validationErrors.baseprice = ''
  validationErrors.subcategory_id = ''
  validationErrors.sizes = ''
  validationErrors.colors = ''
  validationErrors.variants = ''
  variantErrors.value = {}
  
  if (!title.value.trim()) {
    validationErrors.title = 'Title is required'
    isValid = false
  } else if (title.value.trim().length < 3) {
    validationErrors.title = 'Title must be at least 3 characters'
    isValid = false
  }
  
  if (!description.value.trim()) {
    validationErrors.description = 'Description is required'
    isValid = false
  } else if (description.value.trim().length < 10) {
    validationErrors.description = 'Description must be at least 10 characters'
    isValid = false
  }
  
  if (basePrice.value < 0) {
    validationErrors.baseprice = 'Base price must be greater than 0'
    isValid = false
  }
  
  if (!subcategory_id.value || subcategory_id.value === 0) {
    validationErrors.subcategory_id = 'Please select a category'
    isValid = false
  }
  
  const validSizes = sizes.value.filter(s => s.trim() && !sizeErrors.value[sizes.value.indexOf(s)])
  if (validSizes.length === 0) {
    validationErrors.sizes = 'At least one valid size is required'
    isValid = false
  }
  
  const validColors = colors.value.filter(c => c.trim() && !colorErrors.value[colors.value.indexOf(c)])
  if (validColors.length === 0) {
    validationErrors.colors = 'At least one valid color is required'
    isValid = false
  }
  
  if (productVariants.value.length === 0) {
    validationErrors.variants = 'At least one product variant is required'
    isValid = false
  } else {
    let hasValidVariant = false
    
    for (const variant of productVariants.value) {
      const priceKey = `${variant.size}-${variant.color}-price`
      const stockKey = `${variant.size}-${variant.color}-stock`
      const availabilityKey = `${variant.size}-${variant.color}-availability`
      
      if (!variant.price || variant.price <= 0) {
        variantErrors.value[priceKey] = 'Price is required'
        isValid = false
      }
      
      if (!variant.stock || variant.stock < 0) {
        variantErrors.value[stockKey] = 'Stock must be 0 or greater'
        isValid = false
      }
      
      if (variant.availability === '') {
        variantErrors.value[availabilityKey] = 'Please select availability'
        isValid = false
      } else {
        hasValidVariant = true
      }
    }
    
    if (!hasValidVariant) {
      validationErrors.variants = 'At least one complete variant is required'
      isValid = false
    }
  }
  
  return isValid
}

async function saveProduct() {
  if (!validateForm()) {
    toast.value.add({ 
      severity: 'error', 
      summary: 'Validation Error', 
      detail: 'Please fix the errors before submitting', 
      life: 5000 
    })
    return
  }
  
  isSubmitting.value = true

  const filteredDetails = additionalDetails.value.filter(detail => 
    detail.key.trim() !== '' || detail.value.trim() !== ''
  )

  const variantsForBackend = productVariants.value.map(variant => {
    return {
      ...variant,
      images: variant.images.map(img => img.file)
    }
  })

  const payload = {
    title: title.value,
    description: description.value,
    subcategory_id: subcategory_id.value,
    baseprice: basePrice.value,
    sizes: sizes.value.filter(s => s.trim()),
    colors: colors.value.filter(c => c.trim()),
    details: filteredDetails,
    variants: variantsForBackend
  }

  try {
    await productStore.createFullProduct(payload)
    toast.value.add({ 
      severity: 'success', 
      summary: 'Product Created', 
      detail: 'Your product has been successfully created', 
      life: 5000 
    })
    
    resetForm()
  } catch (err) {
    console.error(err)
    
    if (err.response && err.response.status === 422) {
      const serverErrors = err.response.data.errors || {}
      
      Object.keys(serverErrors).forEach(key => {
        if (key in validationErrors) {
          validationErrors[key] = serverErrors[key][0]
        }
      })
      
      toast.value.add({ 
        severity: 'error', 
        summary: 'Validation Error', 
        detail: 'Please fix the errors highlighted in the form', 
        life: 5000 
      })
    } else {
      toast.value.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: productStore.error || 'An error occurred while creating the product', 
        life: 5000 
      })
    }
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  title.value = ''
  description.value = ''
  subcategory_id.value = 0
  basePrice.value = 0
  sizes.value = ['']
  colors.value = ['']
  additionalDetails.value = [{ key: '', value: '' }]
  productVariants.value = []
  sizeErrors.value = ['']
  colorErrors.value = ['']
  validationErrors = {}
  variantErrors.value = {}
}

sizeErrors.value = Array(sizes.value.length).fill('')
colorErrors.value = Array(colors.value.length).fill('')
</script>