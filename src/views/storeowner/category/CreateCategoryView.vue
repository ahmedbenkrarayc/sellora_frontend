<template>
    <div class="flex-1 overflow-y-auto p-4 md:p-8 pb-16">
        <WelcomeMessage description="Manage your categories effortlessly and stay ahead!" />
        
        <section class="w-full rounded-lg p-3 md:p-4 mt-4 md:mt-6">
            <div class="bg-white px-4 py-6 sm:px-8 md:px-12 lg:px-16 lg:py-12 rounded-lg">
                <h3 class="font-medium text-[19px] text-[#222222] mb-12">Create new category</h3>
            
                <div class="mb-4">
                    <label for="name" class="text-[14px]">Category Name <span class="text-red-600">*</span></label>
                    <input id="name" class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400" type="text" placeholder="Ex: electronics" />
                </div>
            
                <div class="mb-4">
                    <label for="status" class="text-[14px]">Category Status <span class="text-red-600">*</span></label>
                    <select id="name" class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="store_id" class="text-[14px]">Store</label>
                    <input id="store_id" class="block mt-2 px-4 py-2 border-2 rounded-md w-full text-[14px] outline-none bg-transparent placeholder-gray-400" type="text" value="store1" disabled />
                </div>
            
                <button class="block mt-6 px-6 py-2 bg-[#493D9E] hover:bg-[#42369e] w-fit ml-auto text-white rounded-md text-[14px] font-medium">Save category</button>
            </div>
        </section>
    </div>
</template>

<script setup>
import WelcomeMessage from '@/components/commondashboards/WelcomeMessage.vue'
</script>