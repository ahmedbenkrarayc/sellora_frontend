<template>
    <HeaderSection title="Ready to Make It Yours?"/>
    <div class="sm:px-4 md:px-8 py-6 mb-16">
        <div class="w-full h-fit grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            <!--Left-->
            <div class="w-full h-fit sm:py-4 md:py-6 md:px-4">
                <div>
                    <img id="maingallery" class="w-full sm:h-[300px] md:h-[400px] rounded-[0px] object-cover" src="https://picsum.photos/800/600?random=1" alt="Module Image">
                </div>
                <div class="mt-2 w-full h-fit">
                    <swiper
                        :slidesPerView="4"
                        :spaceBetween="5"
                        :modules="modules"
                        class="mySwiper cursor-pointer"
                    >
                        <swiper-slide v-for="i in 8" :key="i">
                            <img @click="setGalleryItem" class="block sm:h-[60px] md:h-[90px] rounded-[0px] w-full object-cover" :src="`https://picsum.photos/200/150?random=${i}`" alt="Thumbnail">
                        </swiper-slide>
                    </swiper>   
                </div>
            </div>
            <!--right-->
            <div class="w-full h-fit sm:py-4 md:py-6 md:px-4 font-rubik break-words">
                <div class="flex justify-between items-center mb-2">
                    <h1 class="font-bold text-[25px]">Premium Web Module</h1>
                </div>
                <div class="mb-4">
                    <p class="mt-[5px] sm:text-[14px] md:text-[15px] font-poppins font-[300]">Web Development</p>
                </div>
                <h2 class="text-[18px] font-[500]">$129.99</h2>
                <h1 class="text-[16px] mt-6">Type</h1>
                <p class="mt-[5px] sm:text-[14px] md:text-[15px] font-poppins font-[300]">
                    Web Development
                </p>
                <h1 class="text-[16px] mt-2">Short Description</h1>
                <p class="mt-[5px] sm:text-[14px] md:text-[15px] font-poppins font-[300]">
                    This premium module includes everything you need to build modern web applications. 
                    It features responsive design, clean code architecture, and comprehensive documentation.
                </p>
                <div class="flex mt-8 text-[14px]">
                    <button class="px-6 py-2 bg-[black] hover:bg-[#1d242d90] transition-all font-[300] font-poppins text-[white] mr-2">Add to cart</button>
                    <button class="px-4 py-2 bg-[black] hover:bg-[#1d242d90] transition-all font-[300] font-poppins text-[white]"><i class="fa-solid fa-bookmark"></i></button>
                </div>
            </div>
        </div>
        <div class="tabs grid grid-cols-2 text-center mt-16">
            <p @click="activeTab = 'description'" :class="{'activetab': activeTab === 'description'}" class="border-b py-4 cursor-pointer text-[15px] text-[gray] font-poppins font-[500]">Description</p>
            <p @click="activeTab = 'details'" :class="{'activetab': activeTab === 'details'}" class="border-b py-4 cursor-pointer text-[15px] text-[gray] font-poppins font-[500]">Additional Details</p>
        </div>

        <!-- Description Tab Content -->
        <div v-if="activeTab === 'description'" class="mt-8">
            <div class="prose max-w-none">
                <h3 class="text-xl font-bold mb-4">Detailed Description</h3>
                <p class="mb-4">This premium web development module is designed to provide developers with all the essential tools and components needed to build modern, responsive web applications. The package includes carefully crafted templates and utilities that follow best practices in web development.</p>
                
                <p class="mb-4">The module features a clean, well-documented codebase that's easy to understand and modify. It's built with scalability in mind, allowing you to extend functionality as your project grows. The architecture follows modern Vue.js patterns, making it intuitive for developers familiar with the framework.</p>
                
                <p class="mb-4">Key aspects of this module include:</p>
                <ul class="list-disc pl-5 mb-4 space-y-2">
                    <li>Responsive design that works across all device sizes</li>
                    <li>Optimized performance with lazy loading where appropriate</li>
                    <li>Accessibility features built-in for better user experience</li>
                </ul>
                
                <p>Whether you're building a small business website or a complex web application, this module provides a solid foundation that will save you development time while ensuring high quality results.</p>
            </div>
        </div>

        <!-- Details Tab Content -->
        <div v-if="activeTab === 'details'" class="mt-8">
            <div class="prose max-w-none">
                <h3 class="text-xl font-bold mb-4">Additional Information</h3>
                <p class="mb-4">This module was last updated on March 1, 2023 and is currently at version 2.1.0. It's compatible with Vue 3.x and has been tested across all modern browsers including Chrome, Firefox, Safari, and Edge.</p>
                
                <p class="mb-4">The package is licensed under MIT, giving you flexibility in how you use it in your projects. The minified file size is approximately 45KB, ensuring it won't significantly impact your application's load time.</p>
                
                <p>For support or questions about implementation, please refer to the documentation included with the module or contact our support team during business hours.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import HeaderSection from '@/components/store/header/HeaderSection.vue'

const modules = [Pagination];
const activeTab = ref('description');

const setGalleryItem = (event) => {
    document.getElementById('maingallery').src = event.target.src;
};
</script>

<style scoped>
.activetab {
    @apply text-[black] border-black;
}

* {
    @apply break-words
}
</style>