<template>
    <div class="mt-[20px] px-4 py-8">
        <h1 class="font-inter font-semibold sm:text-[24px] sm:mb-3 md:text-[20px]">Currated Picks</h1>
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
                            <img class="filt cursor-pointer sm:w-[160px] md:w-[200px] sm:h-[210px] md:h-[250px] object-cover block" :src="item.image" alt="">
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

const products = [
    {
        id: 1,
        name: 'Module One',
        price: 99.99,
        image: 'https://img.ltwebstatic.com/images3_pi/2024/11/11/6d/173128949418469b95803973ca752e9785feb79f86.webp'
    },
    {
        id: 2,
        name: 'Module Two',
        price: 129.99,
        image: 'https://img.ltwebstatic.com/images3_pi/2024/11/11/6d/173128949418469b95803973ca752e9785feb79f86.webp'
    },
    {
        id: 3,
        name: 'Premium Module',
        price: 199.99,
        image: 'https://img.ltwebstatic.com/images3_pi/2024/11/11/6d/173128949418469b95803973ca752e9785feb79f86.webp'
    },
    {
        id: 4,
        name: 'Basic Module',
        price: 49.99,
        image: 'https://img.ltwebstatic.com/images3_pi/2024/11/11/6d/173128949418469b95803973ca752e9785feb79f86.webp'
    },
    {
        id: 5,
        name: 'Advanced Module',
        price: 149.99,
        image: 'https://img.ltwebstatic.com/images3_pi/2024/11/11/6d/173128949418469b95803973ca752e9785feb79f86.webp'
    },
    {
        id: 6,
        name: 'Starter Module',
        price: 79.99,
        image: 'https://img.ltwebstatic.com/images3_pi/2024/11/11/6d/173128949418469b95803973ca752e9785feb79f86.webp'
    },
    {
        id: 7,
        name: 'Professional Module',
        price: 249.99,
        image: 'https://img.ltwebstatic.com/images3_pi/2024/11/11/6d/173128949418469b95803973ca752e9785feb79f86.webp'
    },
    {
        id: 8,
        name: 'Essential Module',
        price: 89.99,
        image: 'https://img.ltwebstatic.com/images3_pi/2024/11/11/6d/173128949418469b95803973ca752e9785feb79f86.webp'
    },
    {
        id: 9,
        name: 'Deluxe Module',
        price: 179.99,
        image: 'https://img.ltwebstatic.com/images3_pi/2024/11/11/6d/173128949418469b95803973ca752e9785feb79f86.webp'
    },
    {
        id: 10,
        name: 'Standard Module',
        price: 119.99,
        image: 'https://img.ltwebstatic.com/images3_pi/2024/11/11/6d/173128949418469b95803973ca752e9785feb79f86.webp'
    }
]

const modules = ref([Pagination])
const slidesPerView = ref(5)

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
    background-color: rgba(0, 0, 0, 0.158);
    display: inline-block;
}

.filt {
    mix-blend-mode: multiply;
}
</style>