import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import { handleApiError, logError } from '@/utils/errorHandler'
import { api } from '@/config/axios'
import axios from 'axios'
import { useTasksStore } from '@/stores/tasks'

// Interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.includes('/logout')) {
      const authStore = useAuthStore()
      authStore.logout()
    }
    return Promise.reject(error)
  },
)

export const useAuthStore = defineStore('auth', () => {
  // State
  const isAuthenticated = ref(false)
  const error = ref(null)
  const loading = ref(false)
  const user = ref(null)

  // Actions
  async function checkAuth() {
    const authCheck = await api.get('/check-auth')
    if (authCheck.data.authenticated === true) {
      isAuthenticated.value = true
      user.value = authCheck.data.user
    } else {
      isAuthenticated.value = false
      user.value = null
    }
    return isAuthenticated.value
  }

  async function getUser() {
    if (!isAuthenticated.value) {
      return false
    }

    try {
      const { data } = await api.get('/me')
      user.value = data.user
      return true
    } catch (err) {
      logError(err, 'Get User')
      error.value = handleApiError(err)
      isAuthenticated.value = false
      user.value = null
      return false
    }
  }

  async function login(credentials) {
    loading.value = true
    error.value = null
    isAuthenticated.value = false
    user.value = null
    error.value = null

    const csrfUrl =
      import.meta.env.VITE_CSRF_URL || 'http://yatlapi.kelelabs.com:8000/sanctum/csrf-cookie'
    await axios.get(csrfUrl, {
      withCredentials: true,
    })

    try {
      const { data } = await api.post('/login', credentials)
      isAuthenticated.value = true
      user.value = data.user
      return true
    } catch (err) {
      error.value = handleApiError(err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(credentials) {
    loading.value = true
    error.value = null

    try {
      const { data } = await api.post('/register', credentials)
      if (data.success) {
        return true
      } else {
        error.value = data.message || 'Registration failed'
        return false
      }
    } catch (err) {
      logError(err, 'Registration')
      error.value = handleApiError(err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    if (isAuthenticated.value) {
      try {
        await api.post('/logout')
        isAuthenticated.value = false
        user.value = null
        error.value = null
        loading.value = false

        const tasksStore = useTasksStore()
        tasksStore.reset()

        await router.push('/login')
      } catch (err) {
        logError(err, 'Logout')
        error.value = handleApiError(err)
      }
    }
  }

  async function forgotPassword(email) {
    loading.value = true
    error.value = null

    try {
      await api.post('/forgot-password', { email })
      return true
    } catch (err) {
      error.value = handleApiError(err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function resetPassword(token, newPassword, passwordConfirmation) {
    loading.value = true
    error.value = null

    try {
      await api.post('/reset-password', {
        token,
        password: newPassword,
        password_confirmation: passwordConfirmation,
      })
      return true
    } catch (err) {
      error.value = handleApiError(err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function initAuth() {
    try {
      const csrfUrl =
        import.meta.env.VITE_CSRF_URL || 'http://yatlapi.kelelabs.com:8000/sanctum/csrf-cookie'

      try {
        await axios.get(csrfUrl, {
          withCredentials: true,
        })
      } catch (csrfError) {
        logError(csrfError, 'CSRF Setup')
        error.value = 'Unable to secure the connection. Please try again.'
        return false
      }

      try {
        const authCheck = await api.get('/check-auth')
        if (authCheck.data.authenticated === true) {
          const { data } = await api.get('/me')
          user.value = data.user
          isAuthenticated.value = true
        } else {
          user.value = null
          isAuthenticated.value = false
        }
      } catch (authError) {
        logError(authError, 'Authentication Check')
        user.value = null
        isAuthenticated.value = false
      }
    } catch (generalError) {
      logError(generalError, 'Auth Initialization')
      user.value = null
      isAuthenticated.value = false
    }
  }

  return {
    isAuthenticated,
    error,
    loading,
    user,
    checkAuth,
    getUser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    initAuth,
  }
})
