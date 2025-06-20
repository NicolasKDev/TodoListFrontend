import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

// Mock axios API
vi.mock('@/config/axios', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn(),
      },
    },
  },
}))

// Mock router
vi.mock('@/router', () => ({
  default: {
    push: vi.fn(),
  },
}))

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

// Mock tasks store
vi.mock('@/stores/tasks', () => ({
  useTasksStore: () => ({
    reset: vi.fn(),
  }),
}))

// Mock errorHandler with new functions
vi.mock('@/utils/errorHandler', () => ({
  handleApiError: vi.fn((err) => {
    if (err.response?.status === 401) {
      return 'Session expired. Please log in again.'
    }
    if (err.response?.status === 422) {
      return 'Invalid data. Please check your information.'
    }
    return err.response?.data?.message || 'An unexpected error occurred'
  }),
  logError: vi.fn(),
}))

describe('Auth Store', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    vi.clearAllMocks()
  })

  it('initializes with correct default values', () => {
    const authStore = useAuthStore()
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.error).toBe(null)
    expect(authStore.loading).toBe(false)
    expect(authStore.user).toBe(null)
  })

  it('can change authentication state', () => {
    const authStore = useAuthStore()
    authStore.isAuthenticated = true
    expect(authStore.isAuthenticated).toBe(true)
  })

  it('can set a user', () => {
    const authStore = useAuthStore()
    const user = { id: 1, email: 'test@example.com' }
    authStore.user = user
    expect(authStore.user).toEqual(user)
  })

  it('can change loading state', () => {
    const authStore = useAuthStore()
    authStore.loading = true
    expect(authStore.loading).toBe(true)
  })

  describe('checkAuth', () => {
    it('returns true when user is authenticated', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')

      api.get.mockResolvedValue({
        data: { authenticated: true, user: { id: 1, email: 'test@example.com' } },
      })

      const result = await authStore.checkAuth()

      expect(result).toBe(true)
      expect(authStore.isAuthenticated).toBe(true)
      expect(authStore.user).toEqual({ id: 1, email: 'test@example.com' })
    })

    it('returns false when user is not authenticated', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')

      api.get.mockResolvedValue({
        data: { authenticated: false },
      })

      const result = await authStore.checkAuth()

      expect(result).toBe(false)
      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.user).toBe(null)
    })
  })

  describe('getUser', () => {
    it('retrieves user information successfully', async () => {
      const authStore = useAuthStore()
      authStore.isAuthenticated = true
      const { api } = await import('@/config/axios')

      api.get.mockResolvedValue({
        data: { user: { id: 1, email: 'test@example.com' } },
      })

      const result = await authStore.getUser()

      expect(result).toBe(true)
      expect(authStore.user).toEqual({ id: 1, email: 'test@example.com' })
    })

    it('returns false if user is not authenticated', async () => {
      const authStore = useAuthStore()
      authStore.isAuthenticated = false

      const result = await authStore.getUser()

      expect(result).toBe(false)
    })

    it('handles errors during user retrieval', async () => {
      const authStore = useAuthStore()
      authStore.isAuthenticated = true
      const { api } = await import('@/config/axios')
      const { handleApiError, logError } = await import('@/utils/errorHandler')

      api.get.mockRejectedValue({
        response: { data: { message: 'User not found' } },
      })

      const result = await authStore.getUser()

      expect(result).toBe(false)
      expect(logError).toHaveBeenCalled()
      expect(handleApiError).toHaveBeenCalled()
      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.user).toBe(null)
    })
  })

  describe('login', () => {
    it('logs in user successfully', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')
      const axios = await import('axios')

      axios.default.get.mockResolvedValue({})
      api.post.mockResolvedValue({
        data: { user: { id: 1, email: 'test@example.com' } },
      })

      const result = await authStore.login({ email: 'test@example.com', password: 'password' })

      expect(result).toBe(true)
      expect(authStore.isAuthenticated).toBe(true)
      expect(authStore.user).toEqual({ id: 1, email: 'test@example.com' })
      expect(authStore.loading).toBe(false)
    })

    it('handles login errors', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')
      const axios = await import('axios')
      const { handleApiError } = await import('@/utils/errorHandler')

      axios.default.get.mockResolvedValue({})
      api.post.mockRejectedValue({
        response: { data: { message: 'Invalid credentials' } },
      })

      const result = await authStore.login({ email: 'test@example.com', password: 'wrong' })

      expect(result).toBe(false)
      expect(handleApiError).toHaveBeenCalled()
      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.loading).toBe(false)
    })
  })

  describe('register', () => {
    it('registers user successfully', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')

      api.post.mockResolvedValue({
        data: { success: true },
      })

      const result = await authStore.register({
        email: 'test@example.com',
        password: 'password',
      })

      expect(result).toBe(true)
      expect(authStore.loading).toBe(false)
    })

    it('handles registration errors', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')
      const { handleApiError, logError } = await import('@/utils/errorHandler')

      api.post.mockRejectedValue({
        response: { data: { message: 'Email already exists' } },
      })

      const result = await authStore.register({
        email: 'test@example.com',
        password: 'password',
      })

      expect(result).toBe(false)
      expect(logError).toHaveBeenCalled()
      expect(handleApiError).toHaveBeenCalled()
      expect(authStore.loading).toBe(false)
    })
  })

  describe('logout', () => {
    it('logs out user successfully', async () => {
      const authStore = useAuthStore()
      authStore.isAuthenticated = true
      authStore.user = { id: 1, email: 'test@example.com' }
      const { api } = await import('@/config/axios')
      const router = await import('@/router')

      api.post.mockResolvedValue({})

      await authStore.logout()

      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.user).toBe(null)
      expect(authStore.error).toBe(null)
      expect(authStore.loading).toBe(false)
      expect(router.default.push).toHaveBeenCalledWith('/login')
    })

    it('handles logout errors', async () => {
      const authStore = useAuthStore()
      authStore.isAuthenticated = true
      const { api } = await import('@/config/axios')
      const { handleApiError, logError } = await import('@/utils/errorHandler')

      api.post.mockRejectedValue(new Error('Network error'))

      await authStore.logout()

      expect(logError).toHaveBeenCalled()
      expect(handleApiError).toHaveBeenCalled()
    })
  })

  describe('forgotPassword', () => {
    it('sends reset email successfully', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')

      api.post.mockResolvedValue({})

      const result = await authStore.forgotPassword('test@example.com')

      expect(result).toBe(true)
      expect(authStore.loading).toBe(false)
    })

    it('handles email sending errors', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')
      const { handleApiError } = await import('@/utils/errorHandler')

      api.post.mockRejectedValue({
        response: { data: { message: 'User not found' } },
      })

      const result = await authStore.forgotPassword('nonexistent@example.com')

      expect(result).toBe(false)
      expect(handleApiError).toHaveBeenCalled()
      expect(authStore.loading).toBe(false)
    })
  })

  describe('resetPassword', () => {
    it('resets password successfully', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')

      api.post.mockResolvedValue({})

      const result = await authStore.resetPassword('token123', 'newpassword', 'newpassword')

      expect(result).toBe(true)
      expect(authStore.loading).toBe(false)
    })

    it('handles reset errors', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')
      const { handleApiError } = await import('@/utils/errorHandler')

      api.post.mockRejectedValue({
        response: { data: { message: 'Invalid token' } },
      })

      const result = await authStore.resetPassword('invalid-token', 'newpassword', 'newpassword')

      expect(result).toBe(false)
      expect(handleApiError).toHaveBeenCalled()
      expect(authStore.loading).toBe(false)
    })
  })

  describe('initAuth', () => {
    it('initializes authentication successfully', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')
      const axios = await import('axios')

      axios.default.get.mockResolvedValue({})
      api.get
        .mockResolvedValueOnce({ data: { authenticated: true } })
        .mockResolvedValueOnce({ data: { user: { id: 1, email: 'test@example.com' } } })

      await authStore.initAuth()

      expect(authStore.isAuthenticated).toBe(true)
      expect(authStore.user).toEqual({ id: 1, email: 'test@example.com' })
    })

    it('handles CSRF errors', async () => {
      const authStore = useAuthStore()
      const axios = await import('axios')

      axios.default.get.mockRejectedValue(new Error('CSRF error'))

      await authStore.initAuth()

      expect(authStore.error).toBe('Unable to secure the connection. Please try again.')
    })

    it('handles authentication errors', async () => {
      const authStore = useAuthStore()
      const { api } = await import('@/config/axios')
      const axios = await import('axios')

      axios.default.get.mockResolvedValue({})
      api.get.mockRejectedValue(new Error('Auth error'))

      await authStore.initAuth()

      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.user).toBe(null)
    })
  })
})
