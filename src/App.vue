<template>
  <div class="min-h-screen bg-background">
    <router-view />
    <info-toast />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import InfoToast from '@/components/InfoToast.vue'
  import { useAuthStore } from '@/stores/auth'
  import { useThemeStore } from '@/stores/theme'

  const authStore = useAuthStore()
  const themeStore = useThemeStore()

  onMounted(async () => {
    themeStore.initTheme()
    await authStore.initAuth()
  })
</script>
