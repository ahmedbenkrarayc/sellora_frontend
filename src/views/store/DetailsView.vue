<template>
    <HeaderSection title="Ready to Make It Yours?"/>
    <div class="sm:px-4 md:px-8 py-6 mb-16">
        <div v-if="loading" class="text-center py-8">Loading product...</div>

        <div v-if="currentProduct" class="w-full h-fit grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            <div class="w-full h-fit sm:py-4 md:py-6 md:px-4">
                <div>
                    <img id="maingallery" class="w-full sm:h-[300px] md:h-[400px] rounded-[0px] object-contain bg-[#ebebeb]" 
                         :src="imagesurl + (selectedVariantImages[0]?.path || '')" 
                         :alt="currentProduct.title">
                </div>
                <div class="mt-2 w-full h-fit">
                    <swiper
                        :slidesPerView="Math.min(4, selectedVariantImages.length)"
                        :spaceBetween="5"
                        :modules="modules"
                        class="mySwiper cursor-pointer"
                    >
                        <swiper-slide v-for="(image, index) in selectedVariantImages" :key="index">
                            <img @click="setMainImage(image.path)" 
                                 class="block sm:h-[60px] md:h-[90px] rounded-[0px] w-full object-cover" 
                                 :src="imagesurl + image.path" 
                                 :alt="'Thumbnail ' + (index + 1)">
                        </swiper-slide>
                    </swiper>   
                </div>
            </div>
            
            <div class="w-full h-fit sm:py-4 md:py-6 md:px-4 font-rubik break-words">
                <h1 class="font-bold text-[25px] mb-2">{{ currentProduct.title }}</h1>
                <p class="mb-4 sm:text-[14px] md:text-[15px] font-poppins font-[300]">
                    {{ currentProduct.subcategory.name }} / {{ currentProduct.subcategory.category.name }}
                </p>
                <h2 class="text-[18px] font-[500]">${{ selectedVariant?.price || '0.00' }}</h2>
                
                <div class="mt-6">
                    <h1 class="text-[16px] mb-2">Colors</h1>
                    <select v-model="selectedColor" @change="updateSelectedVariant"
                            class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-4">
                        <option v-for="color in uniqueColors" :key="color.id" :value="color.name"
                                :disabled="!isOptionAvailable('color', color.name)">
                            {{ color.name }} <span v-if="!isOptionAvailable('color', color.name)">(Out of stock)</span>
                        </option>
                    </select>
                </div>
                
                <div class="mt-2">
                    <h1 class="text-[16px] mb-2">Sizes</h1>
                    <select v-model="selectedSize" @change="updateSelectedVariant"
                            class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-4">
                        <option v-for="size in uniqueSizes" :key="size.id" :value="size.name"
                                :disabled="!isOptionAvailable('size', size.name)">
                            {{ size.name }} <span v-if="!isOptionAvailable('size', size.name)">(Out of stock)</span>
                        </option>
                    </select>
                </div>
                
                <div class="mt-4">
                    <p v-if="selectedVariant" class="text-sm">
                        Availability: 
                        <span :class="{'text-green-500': selectedVariant.stock > 0, 'text-red-500': selectedVariant.stock <= 0}">
                            {{ selectedVariant.stock > 0 ? 'In stock (' + selectedVariant.stock + ' available)' : 'Out of stock' }}
                        </span>
                    </p>
                    <p v-else class="text-red-500 text-sm">This combination is not available</p>
                </div>
                
                <button @click="handleAddToCart" 
                        :disabled="!selectedVariant || selectedVariant.stock <= 0 || wishlistStore.loading"
                        class="mt-8 px-6 py-2 bg-[black] hover:bg-[#1d242d90] transition-all font-[300] font-poppins text-[white] disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="wishlistStore.loading">
                        <i class="fa-solid fa-spinner animate-spin mr-2"></i> Processing...
                    </span>
                    <span v-else>Add to Cart</span>
                </button>
            </div>
        </div>
        
        <div class="tabs grid grid-cols-2 text-center mt-16">
            <p @click="activeTab = 'description'" :class="{'activetab': activeTab === 'description'}" 
               class="border-b py-4 cursor-pointer text-[15px] text-[gray] font-poppins font-[500]">Description</p>
            <p @click="activeTab = 'details'" :class="{'activetab': activeTab === 'details'}" 
               class="border-b py-4 cursor-pointer text-[15px] text-[gray] font-poppins font-[500]">Additional Details</p>
        </div>

        <div v-if="activeTab === 'description'" class="mt-8">
            <h3 class="text-xl font-bold mb-4">Detailed Description</h3>
            <p class="mb-4">{{ currentProduct?.description }}</p>
        </div>

        <div v-if="activeTab === 'details'" class="mt-8">
            <h3 class="text-xl font-bold mb-4">Additional Information</h3>
            <div v-for="detail in currentProduct?.product_details" :key="detail.key" class="mb-2">
                <strong>{{ detail.key }}:</strong> {{ detail.value }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import HeaderSection from '@/components/store/header/HeaderSection.vue'
import { useProductStore } from '@/stores/storeowner/product'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useWishlistStore } from '@/stores/wishlist'
import { useAuthStore } from '@/stores/auth/storeowner/auth'

const imagesurl = import.meta.env.VITE_IMAGES_URL
const route = useRoute()
const productStore = useProductStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()

const modules = [Pagination]
const activeTab = ref('description')

const selectedColor = ref('')
const selectedSize = ref('')
const selectedVariant = ref(null)

const { currentProduct, loading, error } = storeToRefs(productStore)

const uniqueColors = computed(() => {
    if (!currentProduct.value?.variants) return []
    const colors = []
    const seen = new Set()
    
    currentProduct.value.variants.forEach(variant => {
        if (!seen.has(variant.color.id)) {
            seen.add(variant.color.id)
            colors.push(variant.color)
        }
    })
    
    return colors
})

const uniqueSizes = computed(() => {
    if (!currentProduct.value?.variants) return []
    const sizes = []
    const seen = new Set()
    
    currentProduct.value.variants.forEach(variant => {
        if (!seen.has(variant.size.id)) {
            seen.add(variant.size.id)
            sizes.push(variant.size)
        }
    })
    
    return sizes
})

const selectedVariantImages = computed(() => {
    return selectedVariant.value?.images || []
})

const isInCart = computed(() => {
    if (!selectedVariant.value) return false
    return wishlistStore.wishlistItems.some(item => 
        item.productvariant_id === selectedVariant.value.id
    )
})

const setMainImage = (imagePath) => {
    const mainGallery = document.getElementById('maingallery')
    if (mainGallery) {
        mainGallery.src = imagesurl + imagePath
    }
}

const updateSelectedVariant = () => {
    if (!selectedColor.value || !selectedSize.value) return
    
    selectedVariant.value = currentProduct.value.variants.find(v => 
        v.color.name === selectedColor.value && 
        v.size.name === selectedSize.value
    )
}

const isOptionAvailable = (type, value) => {
    return currentProduct.value.variants.some(v => 
        v[type].name === value && 
        v.available && 
        v.stock > 0
    )
}

const handleAddToCart = async () => {
    if (!selectedVariant.value) return
    
    const payload = {
        productvariant_id: selectedVariant.value.id,
        name: currentProduct.value.title,
        price: selectedVariant.value.price,
        image: selectedVariantImages.value[0]?.path || '',
        color: selectedColor.value,
        size: selectedSize.value,
        quantity: 1
    }
    
    if (isInCart.value) {
        await wishlistStore.addItem(authStore.user, payload)
    } else {
        await wishlistStore.addItem(authStore.user, payload)
    }
}

onMounted(async () => {
    await productStore.getProductById(route.params.id)
    await wishlistStore.loadWishlist(authStore.user)
    
    if (currentProduct.value?.variants?.length) {
        const firstAvailable = currentProduct.value.variants.find(v => v.available && v.stock > 0) || currentProduct.value.variants[0]
        selectedVariant.value = firstAvailable
        
        if (firstAvailable) {
            selectedColor.value = firstAvailable.color.name
            selectedSize.value = firstAvailable.size.name
        }
    }
})
</script>

<style scoped>
.activetab {
    @apply text-[black] border-black
}

* {
    @apply break-words
}
</style>