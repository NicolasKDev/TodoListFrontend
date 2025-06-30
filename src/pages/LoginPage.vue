<template>
  <auth-layout>
    <login-form
      :loading="loading"
      @submit="handleLogin"
      @forgot-password="handleForgotPassword"
      @validation-error="handleValidationError"
    />
    <div class="mt-4 text-center">
      <p class="text-sm text-muted-foreground">
        {{ $t('auth.dont_have_account') }}
        <router-link to="/register" class="text-accent hover:text-accent/80 font-medium">
          {{ $t('auth.sign_up') }}
        </router-link>
      </p>
    </div>
  </auth-layout>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useAuthStore } from '@/stores/auth'
  import { useToastStore } from '@/stores/toast'
  import AuthLayout from '@/components/layouts/AuthLayout.vue'
  import LoginForm from '@/components/forms/LoginForm.vue'

  const router = useRouter()
  const { t } = useI18n()
  const authStore = useAuthStore()
  const toastStore = useToastStore()

  const loading = ref(false)

  const handleLogin = async (credentials) => {
    loading.value = true

    try {
      const success = await authStore.login(credentials)
      if (success) {
        router.push('/todo-dashboard')
      } else {
        toastStore.show(authStore.error || t('Invalid credentials'), 'error')
      }
    } catch (err) {
      toastStore.show(err.message || t('An error occurred while logging in'), 'error')
    } finally {
      loading.value = false
    }
  }

  const handleValidationError = (errorMessage) => {
    toastStore.show(errorMessage, 'error')
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password')
  }
</script>
