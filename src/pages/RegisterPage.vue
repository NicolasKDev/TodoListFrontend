<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="w-full max-w-md">
      <register-form
        :loading="loading"
        @submit="handleRegister"
        @validation-error="handleValidationError"
      />
      <div class="mt-4 text-center">
        <p class="text-sm text-muted-foreground">
          Already have an account?
          <router-link to="/login" class="text-accent hover:text-accent/80 font-medium">
            Sign in
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
  import RegisterForm from '@/components/forms/RegisterForm.vue'

  const router = useRouter()
  const authStore = useAuthStore()
  const toastStore = useToastStore()

  const loading = ref(false)

  const handleRegister = async (credentials) => {
    loading.value = true

    try {
      const success = await authStore.register(credentials)
      if (success) {
        toastStore.show('Account created successfully! Please sign in.', 'success')
        router.push('/login')
      } else {
        toastStore.show(authStore.error || 'Registration failed', 'error')
      }
    } catch (err) {
      toastStore.show(err.message || 'An error occurred while registering', 'error')
    } finally {
      loading.value = false
    }
  }

  const handleValidationError = (errorMessage) => {
    toastStore.show(errorMessage, 'error')
  }
</script>
