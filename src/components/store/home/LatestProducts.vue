<template>
    <div class="mt-[20px] px-4 py-8" v-if="products.length > 0">
        <h1 class="font-inter font-semibold sm:text-[24px] sm:mb-3 md:text-[20px]">Latest products</h1>
        <div class="w-full md:px-8">
            <swiper
                :slidesPerView="slidesPerView"
                :spaceBetween="5"
                :modules="modules"
                class="mySwiper"
            >
                <swiper-slide v-for="item in products" :key="item.id">
                    <div class="mt-4 overflow-hidden block">
                        <div class="relative h-fit w-fit test overflow-hidden">
                            <img class="filt cursor-pointer sm:w-[160px] md:w-[200px] sm:h-[210px] md:h-[250px] object-cover block" 
                                 :src="item.image" 
                                 :alt="item.name">
                        </div>
                        <div class="flex justify-between sm:w-[160px] md:w-[200px]">
                            <div class="text-[#1d242d]">
                                <router-link :to="`/module/${item.id}`">
                                    <p class="sm:text-[12px] md:text-[16px] mt-[-2px] font-poppins font-[400] cursor-pointer">
                                        {{ item.name.length <= 14 ? item.name : item.name.slice(0,11).concat("...") }}
                                    </p>
                                    <p class="mt-[-3px] font-poppins sm:text-[12px] md:text-[16px] font-bold">${{ item.price }}</p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { useProductStore } from '@/stores/storeowner/product'
import { useStoreStore } from '@/stores/store'
const imagesUrl = import.meta.env.VITE_IMAGES_URL

const productStore = useProductStore()
const storeStore = useStoreStore()
const modules = ref([Pagination])
const slidesPerView = ref(5)

const products = computed(() => {
  if (!productStore.latestProducts) return []
  
  return productStore.latestProducts.map(product => {
    const price = product.baseprice > 0 ? product.baseprice : 
                 (product.variants?.[0]?.price || 0)
    
    const image = imagesUrl+product.variants?.[0]?.images?.[0]?.path || ''
    
    return {
      id: product.id,
      name: product.title || 'Untitled Product',
      price: price.toFixed(2),
      image: image
    }
  })
})

onMounted(async () => {
  handleResponsiveSlides()
  window.addEventListener("resize", handleResponsiveSlides)
  
  if(storeStore.storeData?.id){
    await productStore.getLatestProducts(storeStore.storeData.id)
  }
})

const handleResponsiveSlides = () => {
    if (window.innerWidth < 545) {
        slidesPerView.value = 2;
    } else if (window.innerWidth < 710) {
        slidesPerView.value = 3;
    } else if (window.innerWidth < 750) {
        slidesPerView.value = 4;
    } else if (window.innerWidth < 879) {
        slidesPerView.value = 3;
    } else if (window.innerWidth < 1024) {
        slidesPerView.value = 4;
    } else if (window.innerWidth < 1084) {
        slidesPerView.value = 4;
    } else {
        slidesPerView.value = 5;
    }
}

onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResponsiveSlides)
})
</script>

<style scoped>
.test {
    background-color: rgba(0, 0, 0, 0.158);
    display: inline-block;
}

.filt {
    mix-blend-mode: multiply;
}
</style>