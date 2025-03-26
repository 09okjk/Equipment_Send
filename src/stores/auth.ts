import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const username = ref('')

  // Hardcoded credentials for demo purposes
  const validUsername = 'admin'
  const validPassword = 'password123'

  function login(enteredUsername: string, enteredPassword: string): boolean {
    if (enteredUsername === validUsername && enteredPassword === validPassword) {
      isAuthenticated.value = true
      username.value = enteredUsername
      // Save authentication state to localStorage
      localStorage.setItem('auth', JSON.stringify({ 
        isAuthenticated: true, 
        username: enteredUsername 
      }))
      return true
    }
    return false
  }

  function logout() {
    isAuthenticated.value = false
    username.value = ''
    // Clear authentication state from localStorage
    localStorage.removeItem('auth')
  }

  function checkAuth() {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      isAuthenticated.value = authData.isAuthenticated
      username.value = authData.username
    }
  }

  return {
    isAuthenticated,
    username,
    login,
    logout,
    checkAuth
  }
})
