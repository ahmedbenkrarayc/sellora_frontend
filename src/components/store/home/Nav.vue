<template>
    <div>
        <div class="bg-black w-full py-[6px] px-4 sm:text-[10px] md:text-[15px] font-inter text-white text-center">
            Welcome to our Online Store - Where Quality Meets Convenience!
        </div>
        <nav class="w-full sm:py-[14px] bg-re sm:px-[10px] md:py-[16px] md:px-[20px] font-inter flex justify-between items-center">
            <div class="sm:flex lg:hidden">
                <router-link to="/contact"><img class="block mx-2 sm:w-[20px] md:w-[22px] cursor-pointer" src="@/assets/icons/mail.svg" alt=""></router-link>
                <img class="block mx-2 sm:w-[20px] md:w-[22px] cursor-pointer" @click="showmenu()" src="@/assets/icons/menu.svg" alt="">
            </div>
            <h1 class="title font-semibold sm:text-[20px] md:text-[22px] cursor-pointer">{{ title }}</h1>
            <ul class="sm:hidden lg:flex text-[16px]">
                <li class="mx-2 cursor-pointer" ><router-link to="/">Home</router-link></li>
                <li class="mx-2 cursor-pointer" ><router-link to="/search">Find Your Style</router-link></li>
                <li class="mx-2 cursor-pointer" ><router-link to="/about">About Us</router-link></li>
                <li class="mx-2 cursor-pointer" ><router-link to="/contact">Contact</router-link></li>
            </ul>
            <div class="flex items-center text-[20px]">
                <img class="block mx-2 sm:w-[20px] md:w-[22px] cursor-pointer cart" @click="showcart()" src="@/assets/icons/cart.svg" alt="">
                <router-link to="/account/favorite"><img class="block mx-2 sm:w-[20px] md:w-[22px] cursor-pointer" src="@/assets/icons/heart.svg" alt=""></router-link>
                <div class="mx-2 relative">
                    <i class="cursor-pointer fa-regular fa-user" @click="toggle($event)"></i>
                    <ul class="topbar-link-wrapper font-poppins font-[300] text-[13px] tracking-[2px]">
                        <div>
                            <li class="mb-[6px] cursor-pointer w-full"><router-link to="/login">Login</router-link></li>
                            <li class=" cursor-pointer w-full"><router-link to="/register">Register</router-link></li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
        <div id="smnav" class="sm:text-[14px] md:text-[16px] py-[20px] px-[10px] lg:hidden sm:w-[250px] md:w-[400px] right-[-100%] top-0 h-full z-[10] fixed bg-white shadow-md">
            <img @click="closemenu()" class="block close ml-auto mx-2 sm:w-[28px]  md:w-[30px] cursor-pointer" src="@/assets/icons/close.svg" alt="">
            <ul class="font-poppins font-[300] tracking-[2px] mt-6">
                <li class="mx-2 my-4 cursor-pointer"><router-link to="/">Home</router-link></li>
                <li class="mx-2 my-4 cursor-pointer"><router-link to="/search">Find Your Style</router-link></li>
                <li class="mx-2 my-4 cursor-pointer"><router-link to="/about">About Us</router-link></li>
                <li class="mx-2 my-4 cursor-pointer"><router-link to="/contact">Contact</router-link></li>
                <li class="mx-2 my-4 cursor-pointer"><router-link to="/wishlist">WishList</router-link></li>
                <li class="mx-2 my-4 cursor-pointer"><router-link to="/login">Login</router-link></li>
                <li class="mx-2 my-4 cursor-pointer"><router-link to="/register">Register</router-link></li>
            </ul>
        </div>
    </div>
    <CartMenu />
</template>

<script setup>
import { ref } from 'vue'
import CartMenu from '@/components/store/header/CartMenu.vue'

const title = ref('Sellora')

function showcart(){
    let cart = document.getElementById('cart')
    cart.classList.remove('cartclose')
    cart.classList.add('cartopen')
}

function showmenu(){
    let nav = document.getElementById('smnav')
    nav.classList.remove('navclose')
    nav.classList.add('navopen')
}

function closemenu(){
    let nav = document.getElementById('smnav')
    nav.classList.remove('navopen')
    nav.classList.add('navclose')
}

function toggle(e){
    let next = e.target.nextElementSibling
    if(next){
        if(next.classList.contains('slidedown')){
            next.classList.remove('slidedown')
            next.classList.add('slideup')
        }else{
            next.classList.remove('slideup')
            next.classList.add('slidedown')
        }
    }
}
</script>

<style scoped>
.cartopen{
    animation: navopen 1s ease-in-out forwards;
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

.topbar-link-wrapper {
    background-color: #ffffff;
    position: absolute;
    right: 0;
    padding: 0px 20px;
    z-index: 9;
    width: 120px;
    text-align: left;
    top: 40px;
    overflow-y: hidden;
    @apply shadow-md;
    height:0;
}

.slideup{
    animation: slideup 500ms ease-in-out forwards;
}

@keyframes slideup{
    from{
        height: fit-content;
        padding: 15px 20px;
        display: block;
    }
    to{
        height: 0;
        padding: 0 20px;
        display: none;
    }
}

.slidedown{
    animation: slidedown 500ms ease-in-out forwards;
}

@keyframes slidedown{
    from{
        height: 0;
        padding: 0 20px;
    }
    to{
        height: fit-content;
        padding: 15px 20px;
    }
}

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

</style>