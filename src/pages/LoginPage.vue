<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="w-full max-w-md">
      <login-form
        :loading="loading"
        @submit="handleLogin"
        @forgot-password="handleForgotPassword"
        @validation-error="handleValidationError"
      />
      <div class="mt-4 text-center">
        <p class="text-sm text-muted-foreground">
          Don't have an account?
          <router-link to="/register" class="text-accent hover:text-accent/80 font-medium">
            Sign up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useToastStore } from '@/stores/toast'
  import LoginForm from '@/components/LoginForm.vue'

  const router = useRouter()
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
        toastStore.show(authStore.error || 'Invalid credentials', 'error')
      }
    } catch (err) {
      toastStore.show(err.message || 'An error occurred while logging in', 'error')
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
