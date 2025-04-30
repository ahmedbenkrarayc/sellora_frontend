<template>
    <div id="cart" class="scroll fixed sm:w-full md:w-[400px] h-full bg-white top-0 right-[-100%] z-[1000] p-[20px] font-reemkufi overflow-y-scroll ">
        <div class="text-[#434343] w-full flex justify-between items-center py-8">
            <p class="text-[25px] font-[500]">Wishlist</p>
            <div class="cursor-pointer text-[20px]" @click="closeMenu">
                <i class="fa-solid fa-x"></i>
            </div>
        </div>
        
        <div v-if="cartItems.length > 0">
            <div class="mt-2 flex items-start relative" v-for="item in cartItems" :key="item.id">
                <div class="flex items-center mr-3 mt-8">
                    <input 
                        type="checkbox" 
                        :id="'item-' + item.id" 
                        v-model="item.selected" 
                        class="hidden"
                    />
                    <label 
                        :for="'item-' + item.id" 
                        class="w-5 h-5 border border-[#d5d5d5] flex items-center justify-center cursor-pointer"
                        :class="{'bg-black': item.selected}"
                    >
                        <i v-if="item.selected" class="fa-solid fa-check text-white text-xs"></i>
                    </label>
                </div>
                
                <img :src="item.image" alt="" class="bg-black w-[67px] h-[100px] block object-cover" />
                <div class="px-[20px] flex-1">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-[13px] font-ibm font-[300] underline text-[#5f5f5f] cursor-pointer">{{ item.name }}</p>
                            <p class="font-ibm font-[300] text-[13px]">{{ item.category }}</p>
                            <p class="font-ibm font-bold text-[13px] text-[#5f5f5f] mt-[5px]">
                                Unit Price (<span class="text-[red]">{{ item.price }}$</span>)
                            </p>
                        </div>
                        <!-- Remove icon -->
                        <button 
                            @click="removeItem(item.id)" 
                            class="text-[#5f5f5f] hover:text-red-500 ml-2"
                        >
                            <i class="fa-solid fa-trash text-sm"></i>
                        </button>
                    </div>
                    <div class="flex mt-4">
                        <div @click="decreaseQuantity(item.id)" class="w-[40px] hover:border border-black h-[40px] flex items-center font-ibm font-bold text-[13px] text-[black] justify-center cursor-pointer">−</div>
                        <div class="w-[40px] h-[40px] flex items-center font-ibm font-bold text-[13px] text-black justify-center">{{ item.quantity }}</div>
                        <div @click="increaseQuantity(item.id)" class="w-[40px] hover:border border-black h-[40px] flex items-center font-ibm font-bold text-[13px] text-[black] justify-center cursor-pointer">+</div>
                    </div>
                </div>
            </div>
            
            <div class="w-full flex justify-between border-[#d5d5d5] border-b border-t py-[10px] mt-[25px]">
                <p class="text-[13px] text-[#434343] leading-[25px] font-karla font-[700] tracking-[3px]">SUBTOTAL</p>
                <p class="text-[13px] text-[red] leading-[25px] font-karla font-[800] tracking-[3px]">${{ selectedSubtotal.toFixed(2) }}</p>
            </div>
            
            <div class="w-full flex justify-between mt-[25px] py-4 px-[8px]">
                <p class="text-[16px] text-[black] font-ibm font-[700]">Total</p>
                <p class="text-[16px] text-[black] font-ibm font-[700]">${{ selectedSubtotal.toFixed(2) }}</p>
            </div>
            
            <router-link :to="'/checkout'">
                <button 
                    class="uppercase mt-[12px] outline-none text-white bg-[#333f48] hover:bg-black px-[20px] py-[14px] w-full text-[12px] tracking-[2px] font-karla font-bold block"
                    :disabled="selectedCount === 0"
                    :class="{'opacity-50 cursor-not-allowed': selectedCount === 0}"
                >
                    check out ({{ selectedCount }})
                </button>
            </router-link>
            
            <p class="text-center font-ibm text-[13px] mt-6">Fashion for Every Occasion</p>
            <p class="text-center font-ibm text-[11px] mt-2">Style That Speaks</p>
        </div>
        
        <div v-else>
            <p class="font-ibm text-[13px]">Your wishlist is currently empty.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const cartItems = ref([
    {
        id: 1,
        name: "Classic White T-Shirt",
        category: "Tops",
        price: 24.99,
        quantity: 1,
        image: "https://img.ltwebstatic.com/v4/j/spmp/2025/04/18/27/1744963956924bb9ff5b93504adcf7941e8349e38a.webp",
        selected: false
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        category: "Bottoms",
        price: 59.99,
        quantity: 1,
        image: "https://img.ltwebstatic.com/v4/j/spmp/2025/04/18/27/1744963956924bb9ff5b93504adcf7941e8349e38a.webp",
        selected: false
    }
]);

const selectedSubtotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
        return item.selected ? total + (item.price * item.quantity) : total;
    }, 0);
});

const selectedCount = computed(() => {
    return cartItems.value.filter(item => item.selected).length;
});

const increaseQuantity = (id) => {
    const item = cartItems.value.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
    }
};

const decreaseQuantity = (id) => {
    const item = cartItems.value.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
    }
};

const removeItem = (id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id);
};

const closeMenu = () => {
    const cart = document.getElementById('cart');
    cart.classList.remove('cartopen');
    cart.classList.add('cartclose');
};
</script>

<style scoped>
.scroll::-webkit-scrollbar{
    width:0;
}

.cartclose{
    animation: cartclose 1s ease-in-out forwards;
}

input[type="checkbox"] + label {
    transition: all 0.2s ease;
}

input[type="checkbox"] + label:hover {
    border-color: #333f48;
}

@keyframes cartclose{
    from{
        right: 0;
    }
    to{
        right: -100%;
    }
}
</style>