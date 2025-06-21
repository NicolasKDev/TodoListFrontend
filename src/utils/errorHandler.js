/**
 * Handles API errors with appropriate user-friendly messages
 * @param {Error} error - The error to handle
 * @returns {string} - The user-friendly error message
 */
export const handleApiError = (error) => {
  // Network errors
  if (!error.response) {
    return 'Connection error. Please check your internet connection.'
  }

  const { status } = error.response

  // Specific HTTP errors
  switch (status) {
    case 401:
      return 'Expired session. Please reconnect.'
    case 403:
      return "Access denied. You don't have the necessary permissions."
    case 404:
      return 'Resource not found.'
    case 422:
      return 'Invalid data. Please check your information.'
    case 429:
      return 'Too many requests. Please wait before trying again.'
    case 500:
      return 'Server error. Please try again later.'
    case 503:
      return 'Service temporarily unavailable. Please try again later.'
    default:
      // For security reasons, don't expose server error messages
      return 'An unexpected error occurred.'
  }
}

/**
 * Logs errors without exposing sensitive information
 * @param {Error} error - The error to log
 * @param {string} context - The context where the error occurred
 */
export const logError = (error, context = 'Application') => {
  // Log minimal to avoid exposing sensitive information
  console.warn(`${context} error:`, {
    status: error.response?.status,
    message: error.response?.data?.message || error.message,
    url: error.config?.url,
  })
}
