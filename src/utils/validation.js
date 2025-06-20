/**
 * Custom validation utilities
 */

// Validation rules
export const validators = {
  required: (value) => {
    return value !== null && value !== undefined && value.toString().trim() !== ''
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },

  minLength: (min) => (value) => {
    return value && value.toString().length >= min
  },

  maxLength: (max) => (value) => {
    return value && value.toString().length <= max
  },

  strongPassword: (value) => {
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumbers = /\d/.test(value)
    const hasMinLength = value.length >= 8

    return hasUpperCase && hasLowerCase && hasNumbers && hasMinLength
  },

  sameAs: (otherValue) => (value) => {
    return value === otherValue
  },
}

// Error messages in English
export const errorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (min) => `This field must contain at least ${min} characters`,
  maxLength: (max) => `This field cannot exceed ${max} characters`,
  strongPassword:
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
  sameAsPassword: 'Passwords do not match',
  invalidFormat: 'This field does not respect the required format',
}

/**
 * Validates a form object against validation rules
 * @param {Object} formData - The form data to validate
 * @param {Object} rules - The validation rules
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export function validateForm(formData, rules) {
  const errors = {}
  let isValid = true

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = formData[field]
    const fieldErrors = []

    for (const [ruleName, ruleValue] of Object.entries(fieldRules)) {
      let rulePassed = true
      let errorMessage = ''

      switch (ruleName) {
        case 'required':
          if (!validators.required(value)) {
            rulePassed = false
            errorMessage = errorMessages.required
          }
          break

        case 'email':
          if (value && !validators.email(value)) {
            rulePassed = false
            errorMessage = errorMessages.email
          }
          break

        case 'minLength':
          if (value && !validators.minLength(ruleValue)(value)) {
            rulePassed = false
            errorMessage = errorMessages.minLength(ruleValue)
          }
          break

        case 'maxLength':
          if (value && !validators.maxLength(ruleValue)(value)) {
            rulePassed = false
            errorMessage = errorMessages.maxLength(ruleValue)
          }
          break

        case 'strongPassword':
          if (value && !validators.strongPassword(value)) {
            rulePassed = false
            errorMessage = errorMessages.strongPassword
          }
          break

        case 'sameAsPassword':
          if (value && !validators.sameAs(formData.password)(value)) {
            rulePassed = false
            errorMessage = errorMessages.sameAsPassword
          }
          break

        default:
          break
      }

      if (!rulePassed) {
        fieldErrors.push(errorMessage)
        isValid = false
      }
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors
    }
  }

  return { isValid, errors }
}

/**
 * Formats validation errors for display
 * @param {Object} errors - The validation errors object
 * @returns {string} - Formatted error message
 */
export function formatValidationErrors(errors) {
  const errorMessages = []

  for (const [field, fieldErrors] of Object.entries(errors)) {
    const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    fieldErrors.forEach((error) => {
      errorMessages.push(`${fieldName}: ${error}`)
    })
  }

  return errorMessages.join('. ')
}
