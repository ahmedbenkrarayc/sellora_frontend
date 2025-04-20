import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
const user = ref(null)

export const useAuthStore = defineStore('auth', () => {
  const apiUrl = import.meta.env.VITE_API_URL

  const setUser = (data) => {
    user.value = data
  }

  const register = async (payload) => {
    return await axios.post(`${apiUrl}/register`, payload, {
      withCredentials: true
    })
  }

  const login = async (payload) => {
    const res = await axios.post(`${apiUrl}/login`, payload, {
      withCredentials: true
    })
    setUser(res.data.user)
    return res
  }

  const getUser = async () => {
    const res = await axios.get(`${apiUrl}/user`, {
      withCredentials: true
    })
    setUser(res.data)
    return res
  }

  const logout = async () => {
    const res = await axios.post(`${apiUrl}/logout`, {}, {
      withCredentials: true
    })
    setUser(null)
    return res
  }

  return {
    user,
    register,
    login,
    getUser,
    logout
  }
})
