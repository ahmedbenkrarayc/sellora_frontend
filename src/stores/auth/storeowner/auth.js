import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const apiUrl = import.meta.env.VITE_API_URL

  const register = async (payload) => {
    return await axios.post(`${apiUrl}/register`, payload, {
      withCredentials: true
    })
  }

  const login = async (payload) => {
    return await axios.post(`${apiUrl}/login`, payload, {
      withCredentials: true
    })
  }

  return {
    register,
    login
  }
})
