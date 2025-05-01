<template>
    <div>
        <HeaderSection title="Discover What You Love"/>
        <div class="pt-[50px] pb-[100px]">
            <div class="w-full" v-if="mobileFilters">
                <p class="font-ibm text-[13px] text-[#434343] mt-4 tracking-[0.25px] text-center">Home / &nbsp;Modules</p>
                <i @click="showmenu()" class="block mx-auto w-fit mt-4 cursor-pointer">
                    <svg width="23px" height="18px" viewBox="0 0 23 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>
                </i>
                <div id="filters" class="sm:text-[14px] md:text-[16px] py-[20px] px-[20px] lg:hidden sm:w-[250px] md:w-[400px] right-[-100%] top-0 h-full z-[10] fixed bg-white shadow-md">
                    <div class="w-full flex justify-between items-center">
                        <h2 class="font-karla font-[700] text-[16px] text-[#434343] mt-[30px] mb-[14px]">Filters</h2>
                        <i @click="closemenu()" class="fa-solid fa-xmark text-[20px] cursor-pointer"></i>
                    </div>
                    <ul class="font-poppins font-[300] tracking-[2px] mt-6">
                        <div class="my-[14px]">
                            <div class="flex items-center justify-between cursor-pointer" @click="toggleitem($event)">
                                <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">TITLE</h2>
                                <i class="fa-solid fa-plus text-[11px]"></i>
                            </div>
                            <ul class="h-0 overflow-hidden">
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px]">
                                    <input 
                                        type="text" 
                                        placeholder="search ..." 
                                        class="outline-none px-[4px] py-[2px]"
                                        v-model="titleFilter"
                                        @input="currentPage = 1"
                                    >
                                </li>
                            </ul>
                        </div>
                        
                        <div class="my-[14px]">
                            <div class="flex items-center justify-between cursor-pointer" @click="toggleitem($event)">
                                <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">CATEGORY</h2>
                                <i class="fa-solid fa-plus text-[11px]"></i>
                            </div>
                            <ul class="h-0 overflow-hidden">
                                <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]" 
                                    @click="selectCategory(null)">
                                    clear
                                </li>
                                <li v-for="category in storeStore.storeData?.categories" 
                                    :key="category.id"
                                    class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]"
                                    @click="selectCategory(category)"
                                    :class="{ 'font-[500]': selectedCategory?.id === category.id }">
                                    {{ category.name }}
                                </li>
                            </ul>
                        </div>
                        
                        <div class="my-[14px]" v-if="selectedCategory">
                            <div class="flex items-center justify-between cursor-pointer" @click="toggleitem($event)">
                                <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">SUB CATEGORY</h2>
                                <i class="fa-solid fa-plus text-[11px]"></i>
                            </div>
                            <ul class="h-0 overflow-hidden">
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                    @click="selectSubcategory(null)">
                                    clear
                                </li>
                                <li v-for="subcategory in selectedCategory.subcategories" 
                                    :key="subcategory.id"
                                    class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                    @click="selectSubcategory(subcategory)"
                                    :class="{ 'font-[500]': selectedSubcategory?.id === subcategory.id }">
                                    {{ subcategory.name }}
                                </li>
                            </ul>
                        </div>
                        
                        <div class="my-[14px]">
                            <div class="flex items-center justify-between cursor-pointer" @click="toggleitem($event)">
                                <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">SORT BY</h2>
                                <i class="fa-solid fa-plus text-[11px]"></i>
                            </div>
                            <ul class="h-0 overflow-hidden">
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                    @click="sortProducts('default')">
                                    clear
                                </li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                    @click="sortProducts('title')">
                                    Title
                                </li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                    @click="sortProducts('latest')">
                                    Latest
                                </li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                    @click="sortProducts('price-low')">
                                    Price low to high
                                </li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                    @click="sortProducts('price-high')">
                                    Price high to low
                                </li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>

            <div :class="getContainerClasses" id="container">
                <div :class="getLeftClasses">
                    <div class="pr-4 w-full max-h-[600px] overflow-y-scroll hidescroll">
                        <p class="font-ibm text-[13px] text-[#434343] mt-4 tracking-[0.25px]">Home / &nbsp;Products</p>
                        <div class="sticky top-0 left-0 w-full h-fit">
                            <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px] mt-[30px] mb-[14px]">FILTERS</h2>
                            <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px] cursor-pointer"
                                @click="clearFilters">
                                CLEAR
                            </h2>
                            
                            <div class="my-[14px]">
                                <div class="flex items-center justify-between max-w-[160px] cursor-pointer" @click="toggleitem($event)">
                                    <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">TITLE</h2>
                                    <i class="fa-solid fa-plus text-[11px]"></i>
                                </div>
                                <ul class="h-0 overflow-hidden">
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px]">
                                        <input 
                                            type="text" 
                                            placeholder="search ..." 
                                            class="outline-none px-[4px] py-[2px]"
                                            v-model="titleFilter"
                                            @input="currentPage = 1"
                                        >
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="my-[14px]">
                                <div class="flex items-center justify-between max-w-[160px] cursor-pointer" @click="toggleitem($event)">
                                    <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">CATEGORY</h2>
                                    <i class="fa-solid fa-plus text-[11px]"></i>
                                </div>
                                <ul class="h-0 overflow-hidden">
                                    <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]"
                                        @click="selectCategory(null)">
                                        clear
                                    </li>
                                    <li v-for="category in storeStore.storeData?.categories" 
                                        :key="category.id"
                                        class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]"
                                        @click="selectCategory(category)"
                                        :class="{ 'font-[500]': selectedCategory?.id === category.id }">
                                        {{ category.name }}
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="my-[14px]" v-if="selectedCategory">
                                <div class="flex items-center justify-between max-w-[160px] cursor-pointer" @click="toggleitem($event)">
                                    <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">SUB CATEGORY</h2>
                                    <i class="fa-solid fa-plus text-[11px]"></i>
                                </div>
                                <ul class="h-0 overflow-hidden">
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                        @click="selectSubcategory(null)">
                                        clear
                                    </li>
                                    <li v-for="subcategory in selectedCategory.subcategories" 
                                        :key="subcategory.id"
                                        class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                        @click="selectSubcategory(subcategory)"
                                        :class="{ 'font-[500]': selectedSubcategory?.id === subcategory.id }">
                                        {{ subcategory.name }}
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="my-[14px]">
                                <div class="flex items-center justify-between max-w-[160px] cursor-pointer" @click="toggleitem($event)">
                                    <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">SORT BY</h2>
                                    <i class="fa-solid fa-plus text-[11px]"></i>
                                </div>
                                <ul class="h-0 overflow-hidden">
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                        @click="sortProducts('default')">
                                        clear
                                    </li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                        @click="sortProducts('title')">
                                        Title
                                    </li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                        @click="sortProducts('latest')">
                                        Latest
                                    </li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                        @click="sortProducts('price-low')">
                                        Price low to high
                                    </li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer"
                                        @click="sortProducts('price-high')">
                                        Price high to low
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div :class="getRightClasses">
                    <div class="flex justify-between items-center w-full pr-4">
                        <p class="sm:text-[20px] md:text-[22px] lg:text-[27px] font-reemkufi font-[400] text-[#434343]">
                            Showing {{ displayedProducts.length }} of {{ filteredProducts.length }} products
                        </p>
                    </div>
                    <p class="font-ibm text-[13px] text-[#434343] mt-2 pr-4">
                        Stay ahead of fashion trends with our curated collections and effortless shopping. From everyday essentials to standout pieces, we bring the latest styles straight to your doorstep.
                    </p>
                    
                    <div v-if="productStore.loading || !isStoreDataLoaded" class="w-full flex justify-center py-10">
                        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                    
                    <div class="w-full grid gap-y-[20px] mt-6" :class="grid" v-if="!productStore.loading && isStoreDataLoaded">
                        <div 
                            class="w-full h-fit" 
                            :class="{padding : true}" 
                            v-for="product in displayedProducts" 
                            :key="product.id"
                        >
                            <div class="relative">
                                <img 
                                    :class="getImageClasses" 
                                    :src="getProductImage(product)" 
                                    :alt="product.title"
                                    class="cursor-pointer"
                                    @click="navigateToProduct(product.id)"
                                >
                            </div>
                            <div class="mt-[10px]">
                                <h3 
                                    class="text-[12px] font-semibold leading-[19px] tracking-[0.21px] font-ibm text-[#434343] font-[300] cursor-pointer"
                                    @click="navigateToProduct(product.id)"
                                >
                                    {{ product.title.length <= 30 ? product.title : product.title.slice(0,30).concat("...") }}
                                </h3>
                                <p class="text-[12.8px] font-ibm text-[#fa363a] font-[700]">
                                    ${{ getProductPrice(product) }}
                                </p>
                                <p class="text-[10px] font-ibm text-[#666]">
                                    {{ product.subcategory?.name }}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="!productStore.loading && isStoreDataLoaded && filteredProducts.length === 0" class="w-full py-10 text-center">
                        <p class="font-ibm text-[#666]">No products found matching your filters</p>
                    </div>

                    <div v-if="shouldShowLoadMore" class="w-full flex justify-center mt-8 mb-8">
                        <button 
                            @click="loadMoreProducts" 
                            class="px-6 py-3 bg-black text-white font-ibm text-sm hover:bg-[#333] transition-colors duration-200"
                            :disabled="loadingMore"
                        >
                            <span v-if="!loadingMore">Load More Products</span>
                            <span v-else class="flex items-center justify-center">
                                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import HeaderSection from '@/components/store/header/HeaderSection.vue'
import { useStoreStore } from '@/stores/store'
import { useProductStore } from '@/stores/storeowner/product'

const router = useRouter()
const storeStore = useStoreStore()
const productStore = useProductStore()

const selectedCategory = ref(null)
const selectedSubcategory = ref(null)
const titleFilter = ref('')
const sortMethod = ref('default')
const allProducts = ref([])
const isStoreDataLoaded = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(12)
const loadingMore = ref(false)

const imageClasses = ref('')
const leftClasses = ref('')
const rightClasses = ref('')
const containerClasses = ref('')
const grid = ref('grid-cols-3')
const mobileFilters = ref(false)
const ready = ref(false)

const getImageClasses = computed(() => 'block object-cover ' + imageClasses.value)
const getLeftClasses = computed(() => 'overflow-hidden h-fit sticky top-0 ' + leftClasses.value)
const getRightClasses = computed(() => 'h-fit ' + rightClasses.value)
const getContainerClasses = computed(() => 'w-full py-4 mx-auto max-w-[1200px] flex ' + containerClasses.value)

const filteredProducts = computed(() => {
    let products = [...allProducts.value]
    
    if (titleFilter.value) {
        const searchTerm = titleFilter.value.toLowerCase()
        products = products.filter(p => p.title.toLowerCase().includes(searchTerm))
    }
    
    if (selectedCategory.value) {
        products = products.filter(p => p.subcategory?.category_id === selectedCategory.value.id)
    }
    
    if (selectedSubcategory.value) {
        products = products.filter(p => p.subcategory_id === selectedSubcategory.value.id)
    }
    
    switch (sortMethod.value) {
        case 'title':
            products.sort((a, b) => a.title.localeCompare(b.title))
            break
        case 'latest':
            products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            break
        case 'price-low':
            products.sort((a, b) => getProductPrice(a) - getProductPrice(b))
            break
        case 'price-high':
            products.sort((a, b) => getProductPrice(b) - getProductPrice(a))
            break
    }
    
    return products
})

const displayedProducts = computed(() => {
    return filteredProducts.value.slice(0, currentPage.value * itemsPerPage.value)
})

const shouldShowLoadMore = computed(() => {
    return filteredProducts.value.length > displayedProducts.value.length
})

const getProductImage = (product) => {
    if (product.variants?.[0]?.images?.[0]?.path) {
        return `${import.meta.env.VITE_IMAGES_URL}/${product.variants[0].images[0].path}`
    }
    return 'https://via.placeholder.com/300x400?text=No+Image'
}

const getProductPrice = (product) => {
    if (product.baseprice > 0) return product.baseprice
    if (product.variants?.length > 0) return product.variants[0].price
    return 0
}

const selectCategory = (category) => {
    selectedCategory.value = category
    selectedSubcategory.value = null
    currentPage.value = 1
}

const selectSubcategory = (subcategory) => {
    selectedSubcategory.value = subcategory
    currentPage.value = 1
}

const clearFilters = () => {
    selectedCategory.value = null
    selectedSubcategory.value = null
    titleFilter.value = ''
    sortMethod.value = 'default'
    currentPage.value = 1
}

const sortProducts = (method) => {
    sortMethod.value = method
    currentPage.value = 1
}

const loadMoreProducts = () => {
    loadingMore.value = true
    setTimeout(() => {
        currentPage.value++
        loadingMore.value = false
    }, 300)
}

const navigateToProduct = (productId) => {
    router.push(`/product/${productId}`)
}

const toggleitem = (e) => {
    let item = e.currentTarget
    let target = item.nextElementSibling
    item = item.children[1]
    if(item.classList.contains('fa-plus')){
        item.classList.remove('fa-plus')
        item.classList.add('fa-minus')
        target.classList.remove('up')
        target.classList.add('down')
    }else{
        item.classList.remove('fa-minus')
        item.classList.add('fa-plus')
        target.classList.remove('down')
        target.classList.add('up')
    }
}

const showmenu = () => {
    let nav = document.getElementById('filters')
    nav.classList.remove('navclose')
    nav.classList.add('navopen')
}

const closemenu = () => {
    let nav = document.getElementById('filters')
    nav.classList.remove('navopen')
    nav.classList.add('navclose')
}

const updateImageSizeClasses = () => {
    const screenSize = window.innerWidth
    if(screenSize > 1210){
        imageClasses.value = 'max-w-[256.57px] h-[380px]'
        leftClasses.value = 'w-[25%]'
        rightClasses.value = 'w-[75%]'
        containerClasses.value = 'px-[40px]'
        grid.value = 'grid-cols-3'
        mobileFilters.value = false
    } else if(screenSize < 759){
        imageClasses.value = 'max-w-[full] h-[400px] px-[5%]'
        leftClasses.value = 'w-[0]'
        rightClasses.value = 'w-[100%]'
        containerClasses.value = ' px-[10px] '
        grid.value = 'grid-cols-2'
        mobileFilters.value = true
    }
}

const loadProducts = async () => {
  if (!isStoreDataLoaded.value || !storeStore.storeData?.id) return
  
  try {
    await productStore.getStoreProducts(storeStore.storeData.id)
    allProducts.value = productStore.storeProducts
  } catch (error) {
    console.error('Failed to fetch products:', error)
  }
}

watch(() => storeStore.storeData, (newVal) => {
  if (newVal) {
    isStoreDataLoaded.value = true
    loadProducts()
  }
}, { immediate: true })

onMounted(() => {
  ready.value = true
  updateImageSizeClasses()
  window.addEventListener('resize', updateImageSizeClasses)
  
  if (storeStore.storeData) {
    isStoreDataLoaded.value = true
    loadProducts()
  }
})
</script>

<style scoped>
.up {
    animation: up 500ms ease-in-out forwards;
}

@keyframes up {
    from {
        height: fit-content;
    }
    to {
        height: 0;
    }
}

.down {
    animation: down 500ms ease-in-out forwards;
}

@keyframes down {
    from {
        height: 0;
    }
    to {
        height: fit-content;
    }
}

.navopen {
    animation: navopen 1s ease-in-out forwards;
}

@keyframes navopen {
    from {
        right: -100%;
    }
    to {
        right: 0;
    }
}

.navclose {
    animation: navclose 1s ease-in-out forwards;
}

@keyframes navclose {
    from {
        right: 0;
    }
    to {
        right: -100%;
    }
}

.hidescroll::-webkit-scrollbar {
    width: 0;
}

.hidescroll {
    scrollbar-width: none;
}
</style>