<template>
    <header class="w-[calc(100%-20px)] h-[600px] overflow-hidden mx-auto">
        <div class="carousel">
          <div class="carousel-inner">
            <div class="carousel-item relative">
                <img class="filt w-full scale-x-[-1] h-[600px] object-cover lg:object-top" src="https://images.pexels.com/photos/4872023/pexels-photo-4872023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Hero image">
                <div class="absolute sm:w-full sm:px-2 md:px-0 md:w-fit h-fit sm:left-0 top-0 bottom-0 md:left-[110px] sm:text-center md:text-left m-auto text-white font-poppins font-[300]">
                    <h6 class="sm:text-[16px] md:text-[18px] mb-[8px] test">New Season, New Trends</h6>
                    <p class="md:max-w-[400px] sm:text-[23px] md:text-[25px] font-semibold test">Step into style with our latest fashion arrivals. Refresh your wardrobe today!</p>
                    <router-link to="/catalog">View More <i class="fa-solid fa-arrow-right-long ml-[4px]"></i></router-link>
                </div>
            </div>
            <div class="carousel-item relative">
                <img class="filt w-full h-[600px] object-cover" src="https://images.pexels.com/photos/8133879/pexels-photo-8133879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Hero image">
                <div class="absolute sm:w-full sm:px-2 md:px-0 md:w-fit h-fit sm:left-0 top-0 bottom-0 md:left-[110px] sm:text-center md:text-left m-auto text-white font-poppins font-[300]">
                    <h6  class="sm:text-[16px] md:text-[18px] mb-[8px] test">Effortless Elegance Awaits</h6>
                    <p  class="md:max-w-[400px] sm:text-[23px] md:text-[25px] font-semibold test">Discover timeless pieces designed to elevate your everyday look. Feel unstoppable!</p>
                    <router-link to="/catalog">View More <i class="fa-solid fa-arrow-right-long ml-[4px]"></i></router-link>
                </div>
            </div>
            <div class="carousel-item relative">
                <img class="filt w-full h-[600px] object-cover lg:object-top" src="https://images.pexels.com/photos/4872020/pexels-photo-4872020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Hero image">
                <div class="absolute sm:w-full sm:px-2 md:px-0 md:w-fit h-fit sm:left-0 top-0 bottom-0 md:left-[110px] sm:text-center md:text-left m-auto text-white font-poppins font-[300]">
                    <h6 class="sm:text-[16px] md:text-[18px] mb-[8px] test">Style for Every Story</h6>
                    <p class="md:max-w-[400px] sm:text-[23px] md:text-[25px] font-semibold test">From casual chic to evening glam — find outfits that match your every mood.</p>
                    <router-link to="/catalog">View More <i class="fa-solid fa-arrow-right-long ml-[4px]"></i></router-link>
                </div>
            </div>
          </div>
          <div class="carousel-controls">
            <button class="bg-white text-black font-bold py-2 px-4 rounded-l" @click="prevSlide"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="bg-white text-black font-bold py-2 px-4 rounded-r" @click="nextSlide"><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
    </header>
</template>
    
<script setup>    
import { ref } from 'vue'
const currentIndex = ref(0)
const numItems = ref(3)

function showSlide(index) {
    if (index < 0 || index >= numItems.value) {
        return;
    }
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
    currentIndex.value = index;
}

function nextSlide() {
    const newIndex = currentIndex.value + 1;
    const nextIndex = newIndex >= numItems.value ? 0 : newIndex;
    showSlide(nextIndex);
}

function prevSlide() {
    const newIndex = currentIndex.value - 1;
    const prevIndex = newIndex < 0 ? numItems.value - 1 : newIndex;
    showSlide(prevIndex);
}

</script>
    
<style scoped>
    .carousel {
        overflow: hidden;
        position: relative;
    }

    .carousel-inner {
        display: flex;
        transition: transform 0.3s ease;
    }

    .carousel-item {
        flex: 0 0 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.26);
        display: inline-block;
    }

    .carousel-controls {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5rem;
    }

    .test{
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    .filt{
        mix-blend-mode: multiply;
    }

    .carousel-item a{
        @apply block md:mx-0 sm:mx-auto w-fit mt-4 text-white border-[2px] sm:text-[11px] md:text-[12px] font-bold font-poppins border-white pl-6 pr-[20px] py-[6px] rounded-full;
    }
</style>