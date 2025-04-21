<template>
    <header class="flex justify-between px-4 md:px-10 pt-5 pb-5 bg-[#F7F7F7]">
      <div class="w-fit flex items-center">
        <div class="flex flex-col sm:flex-row gap-y-2 sm:gap-x-[60px]">
          <div class="flex items-center gap-x-2 bg-white w-fit px-3 py-[6px] rounded-full">
            <span class="bg-[#493D9E] w-[35px] h-[35px] rounded-full flex items-center justify-center">
              <img class="w-[20px] h-[20px]" src="@/assets/images/icon.svg" alt="logo icon" />
            </span>
            <h1 class="font-semibold text-[#222222] text-[15px]">Sellora</h1>
          </div>
          <nav class="h-auto hidden sm:block">
            <ul class="bg-white w-fit h-full flex items-center rounded-full px-3 gap-x-4">
              <li class="text-[#222222] text-[14px] cursor-pointer">Overview</li>
              <li class="text-[#636363] text-[14px] cursor-pointer">List of stores</li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="flex items-center gap-x-3 bg-white px-3 rounded-full">
        <span class="bg-[#F2F4F4] w-[35px] h-[35px] rounded-full flex items-center justify-center">
          <img class="w-[20px] h-[20px]" src="@/assets/images/bell.svg" alt="notification icon" />
        </span>
        <span class="flex items-center cursor-pointer">
          <img class="w-[35px] h-[35px] block" src="@/assets/images/avatar.svg" alt="user avatar" />
        </span>
        <button aria-label="open menu" @click="$emit('toggle-menu')" class="w-[35px] h-[35px] bg-[#F2F4F4] rounded-full flex items-center justify-center lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
</template>
  