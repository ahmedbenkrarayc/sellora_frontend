<template>
    <div>
        <div class="w-full sm:h-[400px] md:h-[300px] plx flex justify-center items-center">
            <h1 class="w-fit text-white font-poppins sm:text-[35px] md:text-[40px] text-center font-[500]">{{ title }}</h1>
        </div>
    </div>
</template>

<script setup>
const { title } = defineProps(['title'])
</script>

<style scoped>
    .plx{
        background-image: url('https://images.pexels.com/photos/4872023/pexels-photo-4872023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-color: rgba(0, 0, 0, 0.247);
        background-blend-mode: multiply;
        background-position: top;
    }
</style>