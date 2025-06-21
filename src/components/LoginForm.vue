<template>
  <div class="w-full max-w-md mx-auto p-6 bg-card text-card-foreground rounded-xl shadow-md">
    <h2 class="text-2xl font-bold text-center mb-6">Sign in</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <input
          id="email"
          type="email"
          v-model="email"
          required
          :disabled="loading"
          class="w-full px-3 py-2 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-background disabled:opacity-50"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium mb-1">Password</label>
        <input
          id="password"
          type="password"
          v-model="password"
          required
          :disabled="loading"
          class="w-full px-3 py-2 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-background disabled:opacity-50"
          placeholder="••••••••"
        />
      </div>

      <div class="flex items-center justify-between">
        <button
          type="button"
          @click="handleForgotPassword"
          :disabled="loading"
          class="text-sm text-accent hover:text-accent/80 disabled:opacity-50"
        >
          Forgot password?
        </button>
      </div>

      <simple-button type="submit" class="w-full" :disabled="loading">
        {{ loading ? 'Please wait...' : 'Sign in' }}
      </simple-button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import SimpleButton from '@/components/SimpleButton.vue'
  import { validateForm, formatValidationErrors } from '@/utils/validation'
  import { loginValidationRules } from '@/utils/validationRules'

  defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const email = ref('')
  const password = ref('')

  const emit = defineEmits(['submit', 'forgotPassword', 'validationError'])

  const handleSubmit = () => {
    const formData = {
      email: email.value,
      password: password.value,
    }

    const { isValid, errors } = validateForm(formData, loginValidationRules)

    if (!isValid) {
      const errorMessage = formatValidationErrors(errors)
      emit('validationError', errorMessage)
      return
    }

    emit('submit', formData)
  }

  const handleForgotPassword = () => {
    emit('forgotPassword', email.value)
  }
</script>
