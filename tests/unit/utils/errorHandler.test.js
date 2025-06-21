import { describe, it, expect, vi } from 'vitest'
import { handleApiError, logError } from '@/utils/errorHandler'

describe('errorHandler', () => {
  describe('handleApiError', () => {
    it('handles network errors', () => {
      const error = {}
      const result = handleApiError(error)
      expect(result).toBe('Connection error. Please check your internet connection.')
    })

    it('handles 401 errors', () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      }
      const result = handleApiError(error)
      expect(result).toBe('Expired session. Please reconnect.')
    })

    it('handles 403 errors', () => {
      const error = {
        response: {
          status: 403,
          data: { message: 'Forbidden' },
        },
      }
      const result = handleApiError(error)
      expect(result).toBe("Access denied. You don't have the necessary permissions.")
    })

    it('handles 404 errors', () => {
      const error = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
      }
      const result = handleApiError(error)
      expect(result).toBe('Resource not found.')
    })

    it('handles 422 validation errors', () => {
      const error = {
        response: {
          status: 422,
          data: { message: 'Validation failed' },
        },
      }
      const result = handleApiError(error)
      expect(result).toBe('Invalid data. Please check your information.')
    })

    it('handles 429 errors', () => {
      const error = {
        response: {
          status: 429,
          data: { message: 'Too many requests' },
        },
      }
      const result = handleApiError(error)
      expect(result).toBe('Too many requests. Please wait before trying again.')
    })

    it('handles 500 errors', () => {
      const error = {
        response: {
          status: 500,
          data: { message: 'Internal server error' },
        },
      }
      const result = handleApiError(error)
      expect(result).toBe('Server error. Please try again later.')
    })

    it('handles 503 errors', () => {
      const error = {
        response: {
          status: 503,
          data: { message: 'Service unavailable' },
        },
      }
      const result = handleApiError(error)
      expect(result).toBe('Service temporarily unavailable. Please try again later.')
    })

    it('handles unknown status codes securely', () => {
      const error = {
        response: {
          status: 418,
          data: { message: "I'm a teapot" },
        },
      }
      const result = handleApiError(error)
      expect(result).toBe('An unexpected error occurred.')
    })
  })

  describe('logError', () => {
    it('logs error information without exposing sensitive data', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const error = {
        response: {
          status: 500,
          data: { message: 'Internal server error' },
        },
        config: {
          url: '/api/test',
        },
      }

      logError(error, 'Test Context')

      expect(consoleSpy).toHaveBeenCalledWith('Test Context error:', {
        status: 500,
        message: 'Internal server error',
        url: '/api/test',
      })

      consoleSpy.mockRestore()
    })

    it('handles errors without response', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const error = {
        message: 'Network error',
        config: {
          url: '/api/test',
        },
      }

      logError(error, 'Test Context')

      expect(consoleSpy).toHaveBeenCalledWith('Test Context error:', {
        status: undefined,
        message: 'Network error',
        url: '/api/test',
      })

      consoleSpy.mockRestore()
    })

    it('uses default context when none provided', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const error = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
      }

      logError(error)

      expect(consoleSpy).toHaveBeenCalledWith('Application error:', {
        status: 404,
        message: 'Not found',
        url: undefined,
      })

      consoleSpy.mockRestore()
    })
  })
})
