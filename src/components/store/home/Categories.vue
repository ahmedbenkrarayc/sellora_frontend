<template>
    <div class="mt-[20px] px-4 py-8 relative">
        <div class="flex justify-between items-center mb-3">
            <h1 class="font-inter font-semibold sm:text-[24px] md:text-[20px]">Categories</h1>
            <div class="flex space-x-2">
                <button 
                    @click="slidePrev"
                    class="bg-white/80 hover:bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                >
                    <i class="fa-solid fa-chevron-left text-sm"></i>
                </button>
                <button 
                    @click="slideNext"
                    class="bg-white/80 hover:bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                >
                    <i class="fa-solid fa-chevron-right text-sm"></i>
                </button>
            </div>
        </div>
        <div class="w-full md:px-8">
            <swiper
                :slidesPerView="slidesPerView"
                :spaceBetween="5"
                :modules="modules"
                class="mySwiper cursor-grabbing"
                @swiper="setSwiperInstance"
            >
                <swiper-slide v-for="item in data" :key="item.id">
                    <div class="mt-4 overflow-hidden">
                        <div class="relative h-fit w-fit test overflow-hidden">
                            <img class="filt sm:w-[160px] md:w-[200px] sm:h-[210px] md:h-[250px] object-cover" :src="item.image" alt="">
                            <div class="absolute w-fit h-fit cursor-pointer text-white font-varela font-semibold m-auto inset-0 font-regular rounded-md sm:text-[10px] md:text-sm sm:pl-[8px] sm:pr-[12px] md:pl-[10px] md:pr-[14px] py-[6px]">
                                <router-link :to="`/product/${item.id}`">{{ item.name.length <= 14 ? item.name : item.name.slice(0,11).concat("...") }} </router-link>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper/modules'

const data = ref([
    {
        id: 1,
        name: "Adventure Pack",
        image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        name: "Relaxation Pack",
        image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        name: "Family Pack",
        image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        name: "Honeymoon Pack",
        image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        name: "Business Pack",
        image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 6,
        name: "Luxury Pack",
        image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 7,
        name: "Budget Pack",
        image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
])

const modules = ref([Pagination, Navigation])
const slidesPerView = ref(5)
const swiperInstance = ref(null)

const setSwiperInstance = (swiper) => {
    swiperInstance.value = swiper
}

const slideNext = () => {
    if (swiperInstance.value) {
        swiperInstance.value.slideNext()
    }
}

const slidePrev = () => {
    if (swiperInstance.value) {
        swiperInstance.value.slidePrev()
    }
}

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

onMounted(() => {
    handleResponsiveSlides()
    window.addEventListener("resize", handleResponsiveSlides)
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResponsiveSlides)
})
</script>

<style scoped>
.test {
    background-color: rgba(0, 0, 0, 0.411);
    display: inline-block;
}

.filt {
    mix-blend-mode: multiply;
}
</style>