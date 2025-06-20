<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="w-full max-w-md">
      <reset-password-form
        :loading="loading"
        @submit="handleSubmit"
        @validation-error="handleValidationError"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useToastStore } from '@/stores/toast'
  import { useAuthStore } from '@/stores/auth'
  import ResetPasswordForm from '@/components/ResetPasswordForm.vue'

  const route = useRoute()
  const router = useRouter()
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
        toastStore.show('Your password has been reset successfully', 'success')
        router.push('/login')
      } else {
        toastStore.show(authStore.error, 'error')
      }
    } catch (err) {
      toastStore.show(err.message || 'An error occurred', 'error')
    } finally {
      loading.value = false
    }
  }

  const handleValidationError = (errorMessage) => {
    toastStore.show(errorMessage, 'error')
  }
</script>
