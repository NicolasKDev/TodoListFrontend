<template>
  <div class="w-full max-w-md mx-auto p-6 bg-card text-card-foreground rounded-xl shadow-md">
    <h2 class="text-2xl font-bold text-center mb-6">Sign up</h2>
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

      <div>
        <label for="confirmPassword" class="block text-sm font-medium mb-1">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          required
          :disabled="loading"
          class="w-full px-3 py-2 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-background disabled:opacity-50"
          placeholder="••••••••"
        />
      </div>

      <simple-button type="submit" class="w-full" :disabled="loading">
        {{ loading ? 'Please wait...' : 'Sign up' }}
      </simple-button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import SimpleButton from '@/components/SimpleButton.vue'
  import { validateForm, formatValidationErrors } from '@/utils/validation'
  import { registerValidationRules } from '@/utils/validationRules'

  defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  const emit = defineEmits(['submit', 'validationError'])

  const handleSubmit = () => {
    const formData = {
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    }

    const { isValid, errors } = validateForm(formData, registerValidationRules)

    if (!isValid) {
      const errorMessage = formatValidationErrors(errors)
      emit('validationError', errorMessage)
      return
    }

    emit('submit', formData)
  }
</script>
