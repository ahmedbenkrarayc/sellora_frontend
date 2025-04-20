import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const register = async (payload) => {
    const apiUrl = import.meta.env.VITE_API_URL
    return await axios.post(`${apiUrl}/register`, payload)
  }

  return {
    register
  }
})
