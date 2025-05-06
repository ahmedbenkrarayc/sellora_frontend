<template>
    <div class="bg-[#F7F7F7] font-poppins flex flex-col h-screen overflow-x-hidden m-0 p-0">
      <Toast ref="toastRef" />
      <div class="font-inter">
        <div class="bg-white w-full min-h-screen bg-[url('/images/background.png')] font-thin flex lg:flex-row sm:flex-col sm:py-[100px] lg:py-8 gap-y-10">
  
          <div class="flex-1 lg:flex lg:justify-center lg:items-center">
            <div class="sm:mx-auto sm:w-[90%] md:w-[80%] lg:w-[80%] h-fit px-4">
              <h1 class="text-white font-semibold sm:text-[26px] md:text-[40px]">Welcome To Sellora</h1>
              <p class="text-white mt-3 font-[300] text-[14px]">
                Sellora is your gateway to next-generation eCommerce. Designed for ambitious brands and modern entrepreneurs, our platform simplifies the way you build, manage, and scale your online store.
              </p>
            </div>
          </div>
  
          <div class="flex-1 lg:flex lg:justify-center lg:items-center">
            <div class="sm:mx-auto sm:w-[90%] md:w-[80%] lg:w-[80%] h-fit px-8 py-10 rounded-lg bg-white">
              <h1 class="text-2xl font-medium text-gray-700">Create Your Account</h1>
              <p class="mt-4 text-gray-500 font-[400] text-[14px]">Join Sellora and launch your online business today!</p>
  
              <div class="mt-6 font-[400] text-[14px]">
                <div class="flex-1 mt-4">
                  <label class="block mb-2 text-sm text-gray-600">First Name</label>
                  <input type="text" v-model="form.fname" placeholder="First Name" class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                </div>
  
                <div class="flex-1 mt-4">
                  <label class="block mb-2 text-sm text-gray-600">Last Name</label>
                  <input type="text" v-model="form.lname" placeholder="Last Name" class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                </div>
  
                <div class="flex-1 mt-4">
                  <label class="block mb-2 text-sm text-gray-600">Email</label>
                  <input type="email" v-model="form.email" placeholder="Email" class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                </div>
  
                <div class="flex-1 mt-4">
                  <label class="block mb-2 text-sm text-gray-600">Password</label>
                  <input type="password" v-model="form.password" placeholder="Password" class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                </div>
  
                <div class="flex-1 mt-4">
                  <label class="block mb-2 text-sm text-gray-600">Confirm Password</label>
                  <input type="password" v-model="form.password_confirmation" placeholder="Confirm Password" class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md" />
                </div>
  
                <button @click="submit" class="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-md focus:outline-none focus:ring focus:ring-[#00000082] focus:ring-opacity-50">
                  Register
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
  import { useStoreStore } from '@/stores/store'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const toastRef = ref()
  
  const form = reactive({
    fname: '',
    lname: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'customer'
  })
  
  const formErrors = reactive({
    fname: '',
    lname: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  
  function validateForm() {
    let isValid = true
    Object.keys(formErrors).forEach(key => (formErrors[key] = ''))
  
    if (!form.fname) {
      formErrors.fname = 'First name is required'
      isValid = false
    }
  
    if (!form.lname) {
      formErrors.lname = 'Last name is required'
      isValid = false
    }
  
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      formErrors.email = 'A valid email is required'
      isValid = false
    }
  
    if (!form.password) {
      formErrors.password = 'Password is required'
      isValid = false
    }
  
    if (form.password !== form.password_confirmation) {
      formErrors.password_confirmation = 'Passwords do not match'
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
  const storeStore = useStoreStore()
  
  async function submit() {
    if (!validateForm()) {
      Object.values(formErrors).forEach(error => {
        if (error) showToast('error', 'Validation Error', error)
      })
      return
    }
  
    try {
      form.store_id = storeStore.storeData?.id  
      const response = await authStore.register({ ...form })
      showToast('success', 'Registration Successful', 'You have successfully registered!')
      window.location.href = 'http://sellora.local:5173/login'
    } catch (error) {
      const msg = error.response?.data?.message || 'An error occurred during registration.'
      showToast('error', 'Registration Failed', msg)
    }
  }
</script>
  