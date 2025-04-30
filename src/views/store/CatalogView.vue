<template>
    <div>
        <HeaderSection title="Discover What You Love"/>
        <div class="pt-[50px] pb-[100px]">
            <div class="w-full" v-if="mobileFilters">
                <p class="font-ibm text-[13px] text-[#434343] mt-4 tracking-[0.25px] text-center">Home / &nbsp;Modules</p>
                <i @click="showmenu()" class="block mx-auto w-fit mt-4 cursor-pointer">
                    <svg width="23px" height="18px" viewBox="0 0 23 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="PLP" transform="translate(-149.000000, -191.000000)" fill="#363A3B" fill-rule="nonzero">
                                <g id="filter" transform="translate(149.000000, 191.000000)">
                                    <path d="M22.4352941,10 L20.5647059,10 C20.2470588,10 20,9.78125 20,9.5 C20,9.21875 20.2470588,9 20.5647059,9 L22.4352941,9 C22.7529412,9 23,9.21875 23,9.5 C23,9.75 22.7529412,10 22.4352941,10 Z" id="Shape"></path>
                                    <path d="M13.5387597,10 L0.434108527,10 C0.189922481,10 0,9.78125 0,9.5 C0,9.21875 0.189922481,9 0.434108527,9 L13.5658915,9 C13.8100775,9 14,9.21875 14,9.5 C13.9728682,9.75 13.7829457,10 13.5387597,10 Z" id="Shape"></path>
                                    <path d="M17,12 C15.3225806,12 14,10.6451613 14,9 C14,7.32258065 15.3548387,6 17,6 C18.6774194,6 20,7.35483871 20,9 C20,10.6451613 18.6451613,12 17,12 Z M17,7 C15.9032258,7 15.0322581,7.90322581 15.0322581,8.96774194 C15.0322581,10.0645161 15.9354839,10.9354839 17,10.9354839 C18.0967742,10.9354839 18.9677419,10.0322581 18.9677419,8.96774194 C18.9677419,7.90322581 18.0967742,7 17,7 Z" id="Shape"></path>
                                    <path d="M0.564705882,16 L2.43529412,16 C2.75294118,16 3,15.78125 3,15.5 C3,15.21875 2.75294118,15 2.43529412,15 L0.564705882,15 C0.247058824,15 0,15.21875 0,15.5 C-1.25389895e-15,15.78125 0.247058824,16 0.564705882,16 Z" id="Shape"></path>
                                    <path d="M9.43410853,16 L22.5658915,16 C22.8100775,16 23,15.78125 23,15.5 C23,15.21875 22.8100775,15 22.5658915,15 L9.43410853,15 C9.18992248,15 9,15.21875 9,15.5 C9,15.78125 9.18992248,16 9.43410853,16 Z" id="Shape"></path>
                                    <path d="M3,15 C3,13.3225806 4.35483871,12 6,12 C7.67741935,12 9,13.3548387 9,15 C9,16.6774194 7.64516129,18 6,18 C4.35483871,18 3,16.6451613 3,15 Z M4.03225806,15 C4.03225806,16.0967742 4.93548387,16.9677419 6,16.9677419 C7.09677419,16.9677419 7.96774194,16.0645161 7.96774194,15 C7.96774194,13.9032258 7.06451613,13.0322581 6,13.0322581 C4.93548387,13.0322581 4.03225806,13.9032258 4.03225806,15 Z" id="Shape"></path>
                                    <path d="M0.564705882,3 L2.43529412,3 C2.75294118,3 3,2.78125 3,2.5 C3,2.21875 2.75294118,2 2.43529412,2 L0.564705882,2 C0.247058824,2 0,2.21875 0,2.5 C0,2.78125 0.247058824,3 0.564705882,3 Z" id="Shape"></path>
                                    <path d="M9.43410853,3 L22.5658915,3 C22.8100775,3 23,2.78125 23,2.5 C23,2.21875 22.8100775,2 22.5658915,2 L9.43410853,2 C9.18992248,2 9,2.21875 9,2.5 C9,2.78125 9.18992248,3 9.43410853,3 Z" id="Shape"></path>
                                    <path d="M3,2.99971786 C3,1.32245626 4.35483871,0 6,0 C7.67741935,0 9,1.35471129 9,2.99971786 C9,4.67697946 7.64516129,5.99943573 6,5.99943573 C4.35483871,6.03169076 3,4.67697946 3,2.99971786 Z M4.03225806,2.99971786 C4.03225806,4.09638891 4.93548387,4.96727474 6,4.96727474 C7.09677419,4.96727474 7.96774194,4.06413388 7.96774194,2.99971786 C7.96774194,1.90304682 7.06451613,1.03216099 6,1.03216099 C4.93548387,1.03216099 4.03225806,1.90304682 4.03225806,2.99971786 Z" id="Shape"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </i>
                <div id="filters" class="sm:text-[14px] md:text-[16px] py-[20px] px-[20px] lg:hidden sm:w-[250px] md:w-[400px] right-[-100%] top-0 h-full z-[10] fixed bg-white shadow-md">
                    <div class="w-full flex justify-between items-center">
                        <h2 class="font-karla font-[700] text-[16px] text-[#434343] mt-[30px] mb-[14px]">Filters</h2>
                        <i @click="closemenu()" class="fa-solid fa-xmark text-[20px] cursor-pointer"></i>
                    </div>
                    <ul class="font-poppins font-[300] tracking-[2px] mt-6">
                        <div class="my-[14px]">
                            <div class="flex items-center justify-between cursor-pointer" @click="toggleitem($event)">
                                <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">TITLE</h2>
                                <i class="fa-solid fa-plus text-[11px]"></i>
                            </div>
                            <ul class="h-0 overflow-hidden">
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px]">
                                    <input type="text" placeholder="search ..." class="outline-none px-[4px] py-[2px]">
                                </li>
                            </ul>
                        </div>
                        <div class="my-[14px]">
                            <div class="flex items-center justify-between cursor-pointer" @click="toggleitem($event)">
                                <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">PRICE</h2>
                                <i class="fa-solid fa-plus text-[11px]"></i>
                            </div>
                            <ul class="h-0 overflow-hidden">
                                <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]">clear</li>
                                <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]">$0 - $100</li>
                                <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]">$100 - $200</li>
                                <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]">$200 - $300</li>
                                <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]">$300+</li>
                            </ul>
                        </div>
                        <div class="my-[14px]">
                            <div class="flex items-center justify-between cursor-pointer" @click="toggleitem($event)">
                                <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">RATES</h2>
                                <i class="fa-solid fa-plus text-[11px]"></i>
                            </div>
                            <ul class="h-0 overflow-hidden">
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">clear</li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">5 stars</li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">4 stars and higher</li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">3 stars and higher</li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">2 stars and higher</li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">1 star and higher </li>
                            </ul>
                        </div>
                        <div class="my-[14px]">
                            <div class="flex items-center justify-between cursor-pointer" @click="toggleitem($event)">
                                <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">SORT BY</h2>
                                <i class="fa-solid fa-plus text-[11px]"></i>
                            </div>
                            <ul class="h-0 overflow-hidden">
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">clear</li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">Title</li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">Latest</li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">Price low to high</li>
                                <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">Price high to low</li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
            <div :class="getContainerClasses" id="container">
                <div :class="getLeftClasses">
                    <div class="pr-4 w-full max-h-[600px] overflow-y-scroll hidescroll">
                        <p class="font-ibm text-[13px] text-[#434343] mt-4 tracking-[0.25px]">Home / &nbsp;Products</p>
                        <div class="sticky top-0 left-0 w-full h-fit">
                            <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px] mt-[30px] mb-[14px]">FILTERS</h2>
                            <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px] cursor-pointer">CLEAR</h2>
                            <div class="my-[14px]">
                                <div class="flex items-center justify-between max-w-[160px] cursor-pointer" @click="toggleitem($event)">
                                    <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">TITLE</h2>
                                    <i class="fa-solid fa-plus text-[11px]"></i>
                                </div>
                                <ul class="h-0 overflow-hidden">
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px]">
                                        <input type="text" placeholder="search ..." class="outline-none px-[4px] py-[2px]">
                                    </li>
                                </ul>
                            </div>
                            <div class="my-[14px]">
                                <div class="flex items-center justify-between max-w-[160px] cursor-pointer" @click="toggleitem($event)">
                                    <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">PRICE</h2>
                                    <i class="fa-solid fa-plus text-[11px]"></i>
                                </div>
                                <ul class="h-0 overflow-hidden">
                                    <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]">clear</li>
                                    <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]">$0 - $100</li>
                                    <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]">$100 - $200</li>
                                    <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]">$200 - $300</li>
                                    <li class="font-ibm cursor-pointer text-[13px] text-[#434343] font-[300] py-[4px]">$300+</li>
                                </ul>
                            </div>
                            <div class="my-[14px]">
                                <div class="flex items-center justify-between max-w-[160px] cursor-pointer" @click="toggleitem($event)">
                                    <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">RATES</h2>
                                    <i class="fa-solid fa-plus text-[11px]"></i>
                                </div>
                                <ul class="h-0 overflow-hidden">
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">clear</li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">5 stars</li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">4 stars and higher</li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">3 stars and higher</li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">2 stars and higher</li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">1 star and higher </li>
                                </ul>
                            </div>
                            <div class="my-[14px]">
                                <div class="flex items-center justify-between max-w-[160px] cursor-pointer" @click="toggleitem($event)">
                                    <h2 class="font-karla font-[700] text-[12px] text-[#434343] tracking-[3px] leading-[25px]">SORT BY</h2>
                                    <i class="fa-solid fa-plus text-[11px]"></i>
                                </div>
                                <ul class="h-0 overflow-hidden">
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">clear</li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">Title</li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">Latest</li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">Price low to high</li>
                                    <li class="font-ibm text-[13px] text-[#444] font-[300] py-[4px] cursor-pointer">Price high to low</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="getRightClasses">
                    <div class="flex justify-between items-center w-full pr-4">
                        <p class="sm:text-[20px] md:text-[22px] lg:text-[27px] font-reemkufi font-[400] text-[#434343]">All products</p>
                    </div>
                    <p class="font-ibm text-[13px] text-[#434343] mt-2 pr-4">
                        Stay ahead of fashion trends with our curated collections and effortless shopping. From everyday essentials to standout pieces, we bring the latest styles straight to your doorstep.
                    </p>
                    <div class="w-full grid gap-y-[20px] mt-6" :class="grid" v-if="ready">
                        <div class="w-full h-fit" :class="{padding : true}" v-for="item in products" :key="item.id">
                            <div class="relative">
                                <img :class="getImageClasses" :src="item.image" :alt="item.name">
                            </div>
                            <div class="mt-[10px]">
                                <h3 class="text-[12px] font-semibold leading-[19px] tracking-[0.21px] font-ibm text-[#434343] font-[300]">
                                    {{ item.name.length <= 30 ? item.name : item.name.slice(0,30).concat("...") }}
                                </h3>
                                <p class="text-[12.8px] font-ibm text-[#fa363a] font-[700]">${{ item.price }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HeaderSection from '@/components/store/header/HeaderSection.vue'

const products = ref([
    {
        id: 1,
        name: 'Oversized Denim Jacket',
        price: 79,
        image: 'https://img.ltwebstatic.com/v4/j/spmp/2025/04/18/27/1744963956924bb9ff5b93504adcf7941e8349e38a.webp',
        created_at: '2023-05-15'
    },
    {
        id: 2,
        name: 'Ribbed Knit Midi Dress',
        price: 59,
        image: 'https://img.ltwebstatic.com/v4/j/spmp/2025/04/18/27/1744963956924bb9ff5b93504adcf7941e8349e38a.webp',
        created_at: '2023-06-20'
    },
    {
        id: 3,
        name: 'High-Waisted Wide Leg Pants',
        price: 69,
        image: 'https://img.ltwebstatic.com/v4/j/spmp/2025/04/18/27/1744963956924bb9ff5b93504adcf7941e8349e38a.webp',
        created_at: '2023-04-10'
    },
    {
        id: 4,
        name: 'Relaxed Fit Linen Shirt',
        price: 49,
        image: 'https://img.ltwebstatic.com/v4/j/spmp/2025/04/18/27/1744963956924bb9ff5b93504adcf7941e8349e38a.webp',
        created_at: '2023-07-05'
    },
    {
        id: 5,
        name: 'Faux Leather Mini Skirt',
        price: 45,
        image: 'https://img.ltwebstatic.com/v4/j/spmp/2025/04/18/27/1744963956924bb9ff5b93504adcf7941e8349e38a.webp',
        created_at: '2023-03-12'
    },
    {
        id: 6,
        name: 'Chunky Sole Sneakers',
        price: 89,
        image: 'https://img.ltwebstatic.com/v4/j/spmp/2025/04/18/27/1744963956924bb9ff5b93504adcf7941e8349e38a.webp',
        created_at: '2023-08-18'
    }
])

const imageClasses = ref('')
const leftClasses = ref('')
const rightClasses = ref('')
const containerClasses = ref('')
const grid = ref('grid-cols-3')
const mobileFilters = ref(false)
const ready = ref(false)

const getImageClasses = computed(() => 'block object-cover ' + imageClasses.value)
const getLeftClasses = computed(() => 'overflow-hidden h-fit sticky top-0 ' + leftClasses.value)
const getRightClasses = computed(() => 'h-fit ' + rightClasses.value)
const getContainerClasses = computed(() => 'w-full py-4 mx-auto max-w-[1200px] flex ' + containerClasses.value)

const toggleitem = (e) => {
    let item = e.currentTarget
    let target = item.nextElementSibling
    item = item.children[1]
    if(item.classList.contains('fa-plus')){
        item.classList.remove('fa-plus')
        item.classList.add('fa-minus')
        target.classList.remove('up')
        target.classList.add('down')
    }else{
        item.classList.remove('fa-minus')
        item.classList.add('fa-plus')
        target.classList.remove('down')
        target.classList.add('up')
    }
}

const showmenu = () => {
    let nav = document.getElementById('filters')
    nav.classList.remove('navclose')
    nav.classList.add('navopen')
}

const closemenu = () => {
    let nav = document.getElementById('filters')
    nav.classList.remove('navopen')
    nav.classList.add('navclose')
}

const updateImageSizeClasses = () => {
    const screenSize = window.innerWidth
    if(screenSize > 1210){
        imageClasses.value = 'max-w-[256.57px] h-[380px]'
        leftClasses.value = 'w-[25%]'
        rightClasses.value = 'w-[75%]'
        containerClasses.value = 'px-[40px]'
        grid.value = 'grid-cols-3'
        mobileFilters.value = false
    } else if(screenSize < 759){
        imageClasses.value = 'max-w-[full] h-[400px] px-[5%]'
        leftClasses.value = 'w-[0]'
        rightClasses.value = 'w-[100%]'
        containerClasses.value = ' px-[10px] '
        grid.value = 'grid-cols-2'
        mobileFilters.value = true
    }
}

onMounted(() => {
    ready.value = true
    updateImageSizeClasses()
    window.addEventListener('resize', updateImageSizeClasses)
})
</script>

<style scoped>
.up{
    animation: up 500ms ease-in-out forwards;
}

@keyframes up{
    from{
        height: fit-content;
    }
    to{
        height: 0;
    }
}

.down{
    animation: down 500ms ease-in-out forwards;
}

@keyframes down{
    from{
        height: 0;
    }
    to{
        height: fit-content;
    }
}
.navopen{
    animation: navopen 1s ease-in-out forwards;
}

@keyframes navopen{
    from{
        right: -100%;
    }
    to{
        right:0;
    }
}

.navclose{
    animation: navclose 1s ease-in-out forwards;
}

@keyframes navclose{
    from{
        right: 0;
    }
    to{
        right: -100%;
    }
}

.hidescroll::-webkit-scrollbar{
    width: 0;
}

.hidescroll{
    scrollbar-width: none;
}
</style>