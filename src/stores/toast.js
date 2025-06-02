import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const message = ref('')
  const type = ref('error')
  const showingTime = 4000
  /**
   * Show a toast message of a given type.
   * @param {string} messageToShow The message to show in the toast.
   * @param {string} typeMessage The type of the message (error, information...)
   * For now only error is handled
   */
  const show = (messageToShow, typeMessage) => {
    message.value = messageToShow
    type.value = typeMessage
    setTimeout(() => reset(), showingTime)
  }

  /**
   * Resets the toast message to an empty string.
   */
  const reset = () => {
    message.value = ''
  }

  return { message, type, show, reset }
})
