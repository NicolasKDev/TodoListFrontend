<template>
  <div class="w-full max-w-md mx-auto p-6 bg-card text-card-foreground rounded-xl shadow-md">
    <h2 class="text-2xl font-bold text-center mb-6">{{ $t('auth.reset_password_title') }}</h2>
    <p class="text-muted-foreground text-center mb-6">{{ $t('auth.please_enter_new_password') }}</p>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="password" class="block text-sm font-medium mb-1">
          {{ $t('auth.new_password') }}
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          :disabled="loading"
          class="w-full px-3 py-2 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-background disabled:opacity-50"
          placeholder="••••••••"
        />
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium mb-1">
          {{ $t('auth.confirm_password') }}
        </label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          required
          :disabled="loading"
          class="w-full px-3 py-2 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-background disabled:opacity-50"
          placeholder="••••••••"
        />
      </div>

      <simple-button type="submit" class="w-full" :disabled="loading">
        {{ loading ? $t('auth.reset_password_loading') : $t('auth.reset_password') }}
      </simple-button>

      <div class="text-center mt-4">
        <p class="text-sm text-muted-foreground">
          <router-link to="/login" class="text-accent hover:text-accent/80 font-medium">
            {{ $t('auth.back_to_login') }}
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import SimpleButton from '@/components/SimpleButton.vue'
  import { validateForm, formatValidationErrors } from '@/utils/validation'
  import { resetPasswordValidationRules } from '@/utils/validationRules'

  defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const password = ref('')
  const confirmPassword = ref('')

  const emit = defineEmits(['submit', 'validationError'])

  const handleSubmit = () => {
    const formData = {
      password: password.value,
      password_confirmation: confirmPassword.value,
    }

    const { isValid, errors } = validateForm(formData, resetPasswordValidationRules)

    if (!isValid) {
      const errorMessage = formatValidationErrors(errors)
      emit('validationError', errorMessage)
      return
    }

    emit('submit', formData)
  }
</script>
