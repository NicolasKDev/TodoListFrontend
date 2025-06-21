/**
 * Validation rules for authentication forms
 */

export const loginValidationRules = {
  email: {
    required: true,
    email: true,
    maxLength: 255,
  },
  password: {
    required: true,
    minLength: 8,
    strongPassword: true,
  },
}

export const registerValidationRules = {
  email: {
    required: true,
    email: true,
    maxLength: 255,
  },
  password: {
    required: true,
    minLength: 8,
    strongPassword: true,
  },
  password_confirmation: {
    required: true,
    sameAsPassword: true,
  },
}

export const resetPasswordValidationRules = {
  password: {
    required: true,
    minLength: 8,
    strongPassword: true,
  },
  password_confirmation: {
    required: true,
    sameAsPassword: true,
  },
}

export const forgotPasswordValidationRules = {
  email: {
    required: true,
    email: true,
    maxLength: 255,
  },
}
