import { describe, it, expect } from 'vitest'
import { validators, validateForm, formatValidationErrors } from '@/utils/validation'
import { loginValidationRules, registerValidationRules } from '@/utils/validationRules'

describe('Validation Utils', () => {
  describe('validators', () => {
    describe('required', () => {
      it('should return true for non-empty strings', () => {
        expect(validators.required('test')).toBe(true)
        expect(validators.required('  test  ')).toBe(true)
      })

      it('should return false for empty values', () => {
        expect(validators.required('')).toBe(false)
        expect(validators.required(null)).toBe(false)
        expect(validators.required(undefined)).toBe(false)
        expect(validators.required('   ')).toBe(false)
      })
    })

    describe('email', () => {
      it('should return true for valid emails', () => {
        expect(validators.email('test@example.com')).toBe(true)
        expect(validators.email('user.name@domain.co.uk')).toBe(true)
      })

      it('should return false for invalid emails', () => {
        expect(validators.email('invalid-email')).toBe(false)
        expect(validators.email('test@')).toBe(false)
        expect(validators.email('@example.com')).toBe(false)
        expect(validators.email('')).toBe(false)
      })
    })

    describe('strongPassword', () => {
      it('should return true for strong passwords', () => {
        expect(validators.strongPassword('Password123')).toBe(true)
        expect(validators.strongPassword('MySecurePass1')).toBe(true)
      })

      it('should return false for weak passwords', () => {
        expect(validators.strongPassword('password')).toBe(false) // no uppercase, no number
        expect(validators.strongPassword('PASSWORD')).toBe(false) // no lowercase, no number
        expect(validators.strongPassword('Password')).toBe(false) // no number
        expect(validators.strongPassword('pass123')).toBe(false) // no uppercase, too short
        expect(validators.strongPassword('Pass1')).toBe(false) // too short
      })
    })
  })

  describe('validateForm', () => {
    describe('login validation', () => {
      it('should validate correct login data', () => {
        const formData = {
          email: 'test@example.com',
          password: 'Password123',
        }

        const result = validateForm(formData, loginValidationRules)
        expect(result.isValid).toBe(true)
        expect(result.errors).toEqual({})
      })

      it('should reject invalid email', () => {
        const formData = {
          email: 'invalid-email',
          password: 'Password123',
        }

        const result = validateForm(formData, loginValidationRules)
        expect(result.isValid).toBe(false)
        expect(result.errors.email).toContain('Please enter a valid email address')
      })

      it('should reject weak password', () => {
        const formData = {
          email: 'test@example.com',
          password: 'weak',
        }

        const result = validateForm(formData, loginValidationRules)
        expect(result.isValid).toBe(false)
        expect(result.errors.password).toContain(
          'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
        )
      })

      it('should reject empty fields', () => {
        const formData = {
          email: '',
          password: '',
        }

        const result = validateForm(formData, loginValidationRules)
        expect(result.isValid).toBe(false)
        expect(result.errors.email).toContain('This field is required')
        expect(result.errors.password).toContain('This field is required')
      })
    })

    describe('register validation', () => {
      it('should validate correct register data', () => {
        const formData = {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'SecurePass123',
          password_confirmation: 'SecurePass123',
        }

        const result = validateForm(formData, registerValidationRules)
        expect(result.isValid).toBe(true)
        expect(result.errors).toEqual({})
      })

      it('should reject mismatched passwords', () => {
        const formData = {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'SecurePass123',
          password_confirmation: 'DifferentPass123',
        }

        const result = validateForm(formData, registerValidationRules)
        expect(result.isValid).toBe(false)
        expect(result.errors.password_confirmation).toContain('Passwords do not match')
      })
    })
  })

  describe('formatValidationErrors', () => {
    it('should format errors correctly', () => {
      const errors = {
        email: ['Please enter a valid email address'],
        password: ['This field is required'],
      }

      const result = formatValidationErrors(errors)
      expect(result).toBe(
        'Email: Please enter a valid email address. Password: This field is required',
      )
    })

    it('should handle field names with underscores', () => {
      const errors = {
        password_confirmation: ['Passwords do not match'],
      }

      const result = formatValidationErrors(errors)
      expect(result).toBe('Password Confirmation: Passwords do not match')
    })
  })
})
