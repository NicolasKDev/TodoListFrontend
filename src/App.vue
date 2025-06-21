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

  const authStore = useAuthStore()

  onMounted(async () => {
    await authStore.initAuth()
  })
</script>
