<template>
  <auth-layout>
    <register-form
      :loading="loading"
      @submit="handleRegister"
      @validation-error="handleValidationError"
    />
    <div class="mt-4 text-center">
      <p class="text-sm text-muted-foreground">
        {{ $t('auth.already_have_account') }}
        <router-link to="/login" class="text-accent hover:text-accent/80 font-medium">
          {{ $t('auth.sign_in') }}
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
  import RegisterForm from '@/components/forms/RegisterForm.vue'

  const router = useRouter()
  const { t } = useI18n()
  const authStore = useAuthStore()
  const toastStore = useToastStore()

  const loading = ref(false)

  const handleRegister = async (credentials) => {
    loading.value = true

    try {
      const success = await authStore.register(credentials)
      if (success) {
        toastStore.show(t('Account created successfully! Please sign in.'), 'success')
        router.push('/login')
      } else {
        toastStore.show(authStore.error || t('Registration failed'), 'error')
      }
    } catch (err) {
      toastStore.show(err.message || t('An error occurred while registering'), 'error')
    } finally {
      loading.value = false
    }
  }

  const handleValidationError = (errorMessage) => {
    toastStore.show(errorMessage, 'error')
  }
</script>
