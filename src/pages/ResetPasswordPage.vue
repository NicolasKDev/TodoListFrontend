<template>
  <auth-layout>
    <reset-password-form
      :loading="loading"
      @submit="handleSubmit"
      @validation-error="handleValidationError"
    />
  </auth-layout>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useToastStore } from '@/stores/toast'
  import { useAuthStore } from '@/stores/auth'
  import AuthLayout from '@/components/layouts/AuthLayout.vue'
  import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue'

  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()
  const authStore = useAuthStore()
  const toastStore = useToastStore()

  const loading = ref(false)

  onMounted(() => {
    if (authStore.isAuthenticated) {
      authStore.logout()
      router.push('/login')
      return
    }
  })

  const handleSubmit = async (formData) => {
    loading.value = true

    try {
      const success = await authStore.resetPassword(
        route.query.token,
        formData.password,
        formData.password_confirmation,
      )
      if (success) {
        toastStore.show(t('Your password has been reset successfully'), 'success')
        router.push('/login')
      } else {
        toastStore.show(authStore.error, 'error')
      }
    } catch (err) {
      toastStore.show(err.message || t('An error occurred'), 'error')
    } finally {
      loading.value = false
    }
  }

  const handleValidationError = (errorMessage) => {
    toastStore.show(errorMessage, 'error')
  }
</script>
