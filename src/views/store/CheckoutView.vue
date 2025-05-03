<template>
    <div>
        <HeaderSection title="You're Almost There!" />
        <div class="grid sm:grid-cols-1 lg:grid-cols-2 min-h-screen w-full font-inter">
            <div class="py-[50px] sm:pr-2 sm:pl-2 md:pl-20 md:pr-20 lg:pl-8 lg:pr-20 sm:order-last lg:order-first">
                <h1 class="text-[18px] text-[#4b5563] font-[500] mb-[26px]">Order Informations</h1>
                <form @submit.prevent="submitForm">
                    <div class="w-full h-fit">
                        <label for="email" class="text-[14px] font-poppins font-[500] block mb-2">Email address</label>
                        <input 
                            v-model="formData.email" 
                            type="email" 
                            placeholder="Email" 
                            class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-1"
                            :class="{'border-red-500': errors.email}"
                            @blur="validateEmail">
                        <span v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</span>
                    </div>
                    <div class="w-full h-fit mt-4">
                        <label for="country" class="text-[14px] font-poppins font-[500] block mb-2">Country</label>
                        <input 
                            v-model="formData.country" 
                            type="text" 
                            placeholder="Country" 
                            class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-1"
                            :class="{'border-red-500': errors.country}"
                            @blur="validateField('country')">
                        <span v-if="errors.country" class="text-red-500 text-xs">{{ errors.country }}</span>
                    </div>
                    <div class="w-full h-fit mt-4">
                        <label for="city" class="text-[14px] font-poppins font-[500] block mb-2">City</label>
                        <input 
                            v-model="formData.city" 
                            type="text" 
                            placeholder="City" 
                            class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-1"
                            :class="{'border-red-500': errors.city}"
                            @blur="validateField('city')">
                        <span v-if="errors.city" class="text-red-500 text-xs">{{ errors.city }}</span>
                    </div>
                    <div class="w-full h-fit mt-4">
                        <label for="postalcode" class="text-[14px] font-poppins font-[500] block mb-2">Postal code</label>
                        <input 
                            v-model="formData.postalCode" 
                            type="text" 
                            placeholder="Postal code" 
                            class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-1"
                            :class="{'border-red-500': errors.postalCode}"
                            @blur="validatePostalCode">
                        <span v-if="errors.postalCode" class="text-red-500 text-xs">{{ errors.postalCode }}</span>
                    </div>
                    <div class="w-full h-fit mt-4">
                        <label for="address" class="text-[14px] font-poppins font-[500] block mb-2">Address</label>
                        <textarea 
                            v-model="formData.address" 
                            type="text" 
                            placeholder="Your full address" 
                            class="bg-[#fafafa] text-[15px] outline-none px-4 py-[10px] border w-full block mb-1 resize-none h-[150px]"
                            :class="{'border-red-500': errors.address}"
                            @blur="validateField('address')"></textarea>
                        <span v-if="errors.address" class="text-red-500 text-xs">{{ errors.address }}</span>
                    </div>
                    
                    <button 
                        type="submit"
                        class="w-full mt-10 px-6 py-2 bg-[black] hover:bg-[#1d242d90] transition-all font-[300] font-poppins text-[white]"
                        :disabled="isSubmitting">
                        {{ isSubmitting ? 'Processing...' : 'Place your order' }}
                    </button>
                </form>
            </div>
            
            <div class="bg-[#f9fafb] py-[50px] sm:pr-2 sm:pl-2 md:pr-20 md:pl-20 lg:pr-8 lg:pl-20">
                <h1 class="text-[18px] font-[500] mb-[26px]">Order Summary</h1>
                
                <div v-for="product in orderStore.checkoutProducts" :key="product.id" 
                     class="w-full h-fit flex justify-between pb-6 mb-6 border-b">
                    <div class="flex">
                        <img class="block object-cover object-center w-[80px] h-[80px] rounded-[6px]" 
                             :src="imagesurl+product.image" 
                             :alt="product.name">
                        <div class="ml-3">
                            <p class="sm:text-[12px] md:text-[14px] text-black font-[500]">{{ product.name }}</p>
                            <p class="sm:text-[12px] md:text-[14px] text-[#6b7280] font-[500]">{{ product.category }}</p>
                            <p class="sm:text-[12px] md:text-[14px] text-[#6b7280] font-[500]">x{{ product.quantity }}</p>
                        </div>
                    </div>
                    <p class="sm:text-[14px] md:text-[16px] text-black font-[500]">
                        ${{ (product.price * product.quantity).toFixed(2) }}
                    </p>
                </div>
                
                <div class="w-full h-fit flex justify-between mt-6">
                    <p class="sm:text-[14px] md:text-[16px] text-[black] font-[500]">Total</p>
                    <p class="sm:text-[14px] md:text-[16px] text-[black] font-[500]">${{ orderTotal }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import HeaderSection from '@/components/store/header/HeaderSection.vue'
import { useOrderStore } from '@/stores/order'
import { useAuthStore } from '@/stores/auth/storeowner/auth'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const imagesurl = import.meta.env.VITE_IMAGES_URL
const router = useRouter()
const orderStore = useOrderStore()
const authStore = useAuthStore()

const formData = ref({
    email: '',
    country: '',
    city: '',
    postalCode: '',
    address: ''
})

const errors = ref({
    email: '',
    country: '',
    city: '',
    postalCode: '',
    address: ''
})

const isSubmitting = ref(false)

const orderTotal = computed(() => {
    return orderStore.checkoutProducts.reduce((total, product) => {
        return total + (product.price * product.quantity)
    }, 0).toFixed(2)
})

onMounted(() => {
    if (orderStore.checkoutProducts.length === 0) 
        router.go(-1)
})

const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.value.email) {
        errors.value.email = 'Email is required'
    } else if (!emailRegex.test(formData.value.email)) {
        errors.value.email = 'Please enter a valid email address'
    } else {
        errors.value.email = ''
    }
}

const validateField = (field) => {
    if (!formData.value[field]) {
        errors.value[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
    } else {
        errors.value[field] = ''
    }
}

const validatePostalCode = () => {
    if (!formData.value.postalCode) {
        errors.value.postalCode = 'Postal code is required'
    } else if (!/^[0-9]+$/.test(formData.value.postalCode)) {
        errors.value.postalCode = 'Postal code should contain only numbers'
    } else if (formData.value.postalCode.length < 4 || formData.value.postalCode.length > 10) {
        errors.value.postalCode = 'Postal code should be between 4-10 digits'
    } else {
        errors.value.postalCode = ''
    }
}

const validateForm = () => {
    validateEmail()
    validateField('country')
    validateField('city')
    validatePostalCode()
    validateField('address')
    
    return !Object.values(errors.value).some(error => error !== '')
}

const submitForm = async () => {
    if (!validateForm()) return
    
    isSubmitting.value = true
    
    try {
        const orderDetails = {
            customer_id: authStore.user?.id,
            email: formData.value.email,
            country: formData.value.country,
            city: formData.value.city,
            postalcode: formData.value.postalCode,
            address: formData.value.address
        }
        
        await orderStore.createOrder(orderDetails)
        
        if (orderStore.currentOrder) {
            router.push('/profile/orders')
        }
    } catch (error) {
        console.error('Order submission error:', error)
    } finally {
        isSubmitting.value = false
    }
}
</script>

<style scoped>
</style>