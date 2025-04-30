<template>
    <div>
        <HeaderSection title="You're Almost There!" />
        <div class="grid sm:grid-cols-1 lg:grid-cols-2 min-h-screen w-full font-inter">
            <div class="py-[50px] sm:pr-2 sm:pl-2 md:pl-20 md:pr-20 lg:pl-8 lg:pr-20 sm:order-last lg:order-first">
                <h1 class="text-[18px] text-[#4b5563] font-[500] mb-[26px]">Order Informations</h1>
                <div class="w-full h-fit">
                  <label for="email" class="text-[14px] font-poppins font-[500] block mb-2">Email address</label>
                  <input type="text" placeholder="Email" class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-4">
                </div>
                <div class="w-full h-fit mt-4">
                  <label for="country" class="text-[14px] font-poppins font-[500] block mb-2">Country</label>
                  <input type="text" placeholder="Country" class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-4">
                </div>
                <div class="w-full h-fit mt-4">
                  <label for="city" class="text-[14px] font-poppins font-[500] block mb-2">City</label>
                  <input type="text" placeholder="City" class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-4">
                </div>
                <div class="w-full h-fit mt-4">
                  <label for="postalcode" class="text-[14px] font-poppins font-[500] block mb-2">Postal code</label>
                  <input type="text" placeholder="Postal code" class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-4">
                </div>
                <div class="w-full h-fit mt-4">
                  <label for="postalcode" class="text-[14px] font-poppins font-[500] block mb-2">Address</label>
                  <textarea type="text" placeholder="Postal code" class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-4 resize-none h-[150px]"></textarea>
                </div>
            </div>
            
            <div class="bg-[#f9fafb] py-[50px] sm:pr-2 sm:pl-2 md:pr-20 md:pl-20 lg:pr-8 lg:pl-20">
                <h1 class="text-[18px] font-[500] mb-[26px]">Order Summary</h1>
                
                <div class="w-full h-fit flex justify-between pb-6 mb-6 border-b">
                    <div class="flex">
                        <img class="block object-cover object-center w-[80px] h-[80px] rounded-[6px]" src="https://img.ltwebstatic.com/v4/j/spmp/2025/04/18/27/1744963956924bb9ff5b93504adcf7941e8349e38a.webp" alt="Product">
                        <div class="ml-3">
                            <p class="sm:text-[12px] md:text-[14px] text-black font-[500]">Product Name</p>
                            <p class="sm:text-[12px] md:text-[14px] text-[#6b7280] font-[500]">Jeans</p>
                            <p class="sm:text-[12px] md:text-[14px] text-[#6b7280] font-[500]">x1</p>
                        </div>
                    </div>
                    <p class="sm:text-[14px] md:text-[16px] text-black font-[500]">$19.99</p>
                </div>
                
                <div class="w-full h-fit flex justify-between pb-6 mb-6 border-b">
                    <div class="flex">
                        <img class="block object-cover object-center w-[80px] h-[80px] rounded-[6px]" src="https://img.ltwebstatic.com/v4/j/spmp/2025/04/18/27/1744963956924bb9ff5b93504adcf7941e8349e38a.webp" alt="Product">
                        <div class="ml-3">
                            <p class="sm:text-[12px] md:text-[14px] text-black font-[500]">Another Product</p>
                            <p class="sm:text-[12px] md:text-[14px] text-[#6b7280] font-[500]">Jeans</p>
                            <p class="sm:text-[12px] md:text-[14px] text-[#6b7280] font-[500]">x2</p>
                        </div>
                    </div>
                    <p class="sm:text-[14px] md:text-[16px] text-black font-[500]">$49.98</p>
                </div>
                
                <div class="w-full h-fit flex justify-between mt-6">
                    <p class="sm:text-[14px] md:text-[16px] text-[black] font-[500]">Total</p>
                    <p class="sm:text-[14px] md:text-[16px] text-[black] font-[500]">$69.97</p>
                </div>

                <button class="w-full mt-10 px-6 py-2 bg-[black] hover:bg-[#1d242d90] transition-all font-[300] font-poppins text-[white]">Place your order</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import HeaderSection from '@/components/store/header/HeaderSection.vue'

</script>

<style scoped>

</style>