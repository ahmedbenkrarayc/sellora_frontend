<template>

    <footer class="mt-[100px] bg-black sm:px-[4rem] md:px-[4rem] lg:px-[5rem] pt-[3rem] pb-[1rem]">
        <div class="md:flex md:gap-x-[80px] lg:gap-x-[100px] sm:w-fit mx-auto md:w-full">
            <div class="md:w-[25%]">
                <h1 class="text-white font-semibold text-xl">{{ title }}</h1>
                <p class="text-[#D7D7D7] mt-2 text-xs">Elevate your style with our latest fashion collections. Shop now on our eCommerce store for trendy, high-quality apparel that fits your lifestyle.</p>
            </div>
            <div class="md:w-[75%] grid md:grid-cols-4 gap-y-6 sm:mt-6 md:mt-0">
                <div>
                    <h1 class="text-white font-medium text-base mb-3">Shop</h1>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">Home</a>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">Products</a>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">Wishlist</a>
                </div>
                <div>
                    <h1 class="text-white font-medium text-base mb-3">Useful</h1>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">About Us</a>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">Contact</a>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">Privacy & Policy</a>
                </div>
                <div>
                    <h1 class="text-white font-medium text-base mb-3">Support</h1>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">FAQs</a>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">Cookie Policy</a>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">Terms of Use</a>
                </div>
                <div>
                    <h1 class="text-white font-medium text-base mb-3">Socials</h1>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">Linkedin</a>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">Instagram</a>
                    <a class="w-fit text-[#D7D7D7] block text-[13px] mb-1" href="#">Facebook</a>
                </div>
            </div>
        </div>
        <hr class="mt-10 mb-4">
        <p class="text-center text-[#D7D7D7] text-xs">
            {{ new Date().getFullYear() - 1 }} - {{ new Date().getFullYear().toString() }} &copy; {{ title }} . All rights Reserved
        </p>
    </footer>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Sellora')
</script>

<style scoped>

</style>