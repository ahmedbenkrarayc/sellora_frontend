<template>
    <div>
        <h1 class="font-semibold text-[18px] md:text-[20px] text-[#222222]">Welcome back, {{ uppercaseFirstLetter(authStore.user?.fname) }}</h1>
        <h2 class="text-[13px] md:text-[14px] text-[#636363]">{{ description }}</h2>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth/storeowner/auth'
import { useStringUtils } from '@/composables/useStringUtils'
const authStore = useAuthStore()
const { uppercaseFirstLetter } = useStringUtils()

const { description } = defineProps(['description'])
</script>