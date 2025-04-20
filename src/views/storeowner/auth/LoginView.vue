<template>
  <div class="bg-[#F7F7F7] font-poppins flex flex-col h-screen overflow-x-hidden m-0 p-0">
    <Toast ref="toastRef" />
    <div class="font-inter">
      <div class="bg-white w-full min-h-screen bg-[url('/images/background.png')] font-thin flex lg:flex-row sm:flex-col sm:py-[100px] lg:py-8 gap-y-10">

        <div class="flex-1 lg:flex lg:justify-center lg:items-center">
          <div class="sm:mx-auto sm:w-[90%] md:w-[80%] lg:w-[80%] h-fit px-4">
            <h1 class="text-white font-semibold sm:text-[26px] md:text-[40px]">Welcome To sellora</h1>
            <p class="text-white mt-3 font-[300] text-[14px]">
              Sellora is your gateway to next-generation eCommerce. Designed for ambitious brands and modern entrepreneurs, our platform simplifies the way you build, manage, and scale your online store. From intuitive storefront design to powerful backend automation, Sellora offers everything you need to grow your business—all in one place. Join Sellora and turn your vision into a thriving digital storefront.
            </p>
          </div>
        </div>

        <div class="flex-1 lg:flex lg:justify-center lg:items-center">
          <div class="sm:mx-auto sm:w-[90%] md:w-[80%] lg:w-[80%] h-fit px-8 py-10 rounded-lg bg-white">
            <h1 class="text-2xl font-medium text-gray-700">Welcome Back,</h1>
            <p class="mt-4 text-gray-500 font-[400] text-[14px]">Welcome to Sellora – where your eCommerce journey begins! Excited to have you with us!</p>

            <div class="mt-6 font-[400] text-[14px]">
                <div class="flex-1 mt-6">
                    <label class="block mb-2 text-sm text-gray-600">Email</label>
                    <input type="text" v-model="form.email" id="email" placeholder="Email" class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-black focus:border-2 outline-none rounded-md" />
                </div>

                <div class="flex-1 mt-6">
                    <label class="block mb-2 text-sm text-gray-600">Password</label>
                    <input type="password" v-model="form.password" id="password" placeholder="Password" class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-black focus:border-2 outline-none rounded-md" />
                </div>

                <button @click="submit()" id="login" class="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-md focus:ring focus:ring-[#00000082] focus:ring-opacity-50">
                    Sign in
                </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Toast from 'primevue/toast'
import { useAuthStore } from '@/stores/auth/storeowner/auth'
import { useRouter } from 'vue-router'
const router = useRouter()

const toastRef = ref()

const form = reactive({
  email: '',
  password: ''
})

const formErrors = reactive({
  email: '',
  password: ''
})

function validateForm() {
  let isValid = true
  formErrors.email = ''
  formErrors.password = ''

  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
    formErrors.email = 'A valid email is required'
    isValid = false
  }

  if (!form.password) {
    formErrors.password = 'Password is required'
    isValid = false
  }

  return isValid
}

function showToast(type, summary, detail) {
  toastRef.value.add({
    severity: type,
    summary,
    detail,
    life: 3000
  })
}

const authStore = useAuthStore()

async function submit() {
  if (!validateForm()) {
    Object.values(formErrors).forEach(error => {
      if (error) showToast('error', 'Validation Error', error)
    })
    return
  }

  try {
    await authStore.login({ ...form })
    showToast('success', 'Login Successful', 'Welcome back!')
    router.push('/')
  } catch (error) {
    const msg = error.response?.data?.message || 'Invalid login credentials.'
    showToast('error', 'Login Failed', msg)
  }
}
</script>
