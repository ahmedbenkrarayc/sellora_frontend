<template>
    <div
      :class="['fixed top-0 right-0 w-full h-full bg-white z-50 overflow-y-auto shadow-xl transition-transform duration-300 ease-in-out', isOpen ? 'translate-x-0' : 'translate-x-full']"
    >
      <div class="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100">
        <div class="flex items-center gap-x-2 sm:gap-x-3">
          <span class="bg-[#493D9E] w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] rounded-full flex items-center justify-center">
            <img class="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" src="@/assets/images/icon.svg" alt="logo icon" />
          </span>
          <h1 class="font-semibold text-[#222222] text-[16px] sm:text-[20px]">Sellora</h1>
        </div>
        <button @click="$emit('close')" class="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] hover:bg-gray-100 rounded-full flex items-center justify-center transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
  
      <div class="p-4 sm:p-6 border-b border-gray-100">
        <div class="flex items-center gap-x-3 sm:gap-x-4">
            <img class="w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] rounded-full" src="@/assets/images/avatar.svg" alt="user avatar">
            <div>
                <p class="font-semibold text-[16px] sm:text-[18px] text-[#222222]">Ahmed Johnson</p>
                <p class="text-[12px] sm:text-[14px] text-[#636363]">Store Owner</p>
            </div>
        </div>
      </div>
  
      <div class="p-4 sm:p-6">
        <ul class="flex flex-col gap-y-2 sm:gap-y-4">
          <!-- nav items -->
        </ul>
  
        <div class="my-3 sm:my-4 border-t border-gray-100"></div>
  
        <ul class="flex flex-col gap-y-2 sm:gap-y-4">
          <li class="flex items-center gap-x-3 sm:gap-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
            <div class="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex items-center justify-center">
              <img class="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" src="@/assets/images/settings.svg" alt="settings icon" />
            </div>
            <span class="text-[14px] sm:text-[16px] text-[#636363]">Settings</span>
          </li>
          <li class="flex items-center gap-x-3 sm:gap-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
            <div class="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex items-center justify-center">
              <img class="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" src="@/assets/images/logout.svg" alt="logout icon" />
            </div>
            <span class="text-[14px] sm:text-[16px] text-[#636363]">Logout</span>
          </li>
        </ul>
      </div>
    </div>
</template>
  
<script setup>
  defineProps({ isOpen: Boolean })
</script>