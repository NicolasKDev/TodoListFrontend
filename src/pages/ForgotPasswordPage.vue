<template>
  <auth-layout>
    <div class="w-full max-w-md mx-auto p-6 bg-card text-card-foreground rounded-xl shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">{{ $t('auth.reset_password') }}</h2>
      <p class="text-muted-foreground text-center mb-6">
        {{ $t('auth.enter_email_for_reset') }}
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1">{{ $t('auth.email') }}</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            :disabled="loading"
            class="w-full px-3 py-2 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-background disabled:opacity-50"
            placeholder="john@email.com"
          />
        </div>

        <simple-button type="submit" class="w-full" :disabled="loading">
          {{ loading ? $t('common.sending') : $t('auth.send_link') }}
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
  </auth-layout>
</template>

<script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToastStore } from '@/stores/toast'
  import { useAuthStore } from '@/stores/auth'
  import AuthLayout from '@/components/layouts/AuthLayout.vue'
  import SimpleButton from '@/components/SimpleButton.vue'
  import { validateForm, formatValidationErrors } from '@/utils/validation'
  import { forgotPasswordValidationRules } from '@/utils/validationRules'

  const { t } = useI18n()
  const email = ref('')
  const loading = ref(false)
  const toastStore = useToastStore()
  const authStore = useAuthStore()

  const handleSubmit = async () => {
    const formData = { email: email.value }

    const { isValid, errors } = validateForm(formData, forgotPasswordValidationRules)

    if (!isValid) {
      const errorMessage = formatValidationErrors(errors)
      toastStore.show(errorMessage, 'error')
      return
    }

    loading.value = true

    try {
      const success = await authStore.forgotPassword(email.value)
      if (success) {
        toastStore.show(
          t('A reset password email has been sent to your email address (check your spam folder)'),
          'success',
        )
        email.value = ''
      } else {
        toastStore.show(authStore.error, 'error')
      }
    } catch (err) {
      toastStore.show(err.message || t('An error occurred'), 'error')
    } finally {
      loading.value = false
    }
  }
</script>
