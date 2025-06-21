<template>
  <div>
    <div class="fixed top-4 left-4 z-60 flex items-center space-x-2">
      <icon-button @click="isOpen = !isOpen">
        <Bars3Icon class="h-6 w-6" />
      </icon-button>
      <h1 v-if="!isOpen" class="text-lg font-bold">Yet another Todo list</h1>
    </div>

    <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-55" @click="isOpen = false"></div>

    <div
      class="fixed top-0 left-0 h-full w-64 bg-card text-card-foreground shadow-lg transform transition-transform duration-300 z-60"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-4 border-b border-border flex items-center justify-between">
        <icon-button @click="isOpen = false">
          <XMarkIcon class="h-5 w-5" />
        </icon-button>
        <div class="flex flex-col items-end">
          <h1 class="text-lg font-bold">Yet another Todo list</h1>
          <span v-if="authStore.user?.email" class="text-sm text-muted-foreground">{{
            authStore.user.email
          }}</span>
        </div>
      </div>

      <nav class="p-4 space-y-2">
        <button
          @click="showLogoutConfirm = true"
          class="w-full text-left px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors flex items-center space-x-2"
        >
          <ArrowRightEndOnRectangleIcon class="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>

    <!-- Logout Confirmation Dialog -->
    <confirm-dialog
      v-model="showLogoutConfirm"
      title="Logout"
      message="Are you sure you want to logout ?"
      confirm-label="Yes, logout"
      @confirm="handleLogout"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import IconButton from '@/components/IconButton.vue'
  import ConfirmDialog from '@/components/ConfirmDialog.vue'
  import { Bars3Icon, XMarkIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/vue/24/outline'

  const isOpen = ref(false)
  const showLogoutConfirm = ref(false)
  const authStore = useAuthStore()

  const handleLogout = () => {
    authStore.logout()
    isOpen.value = false
  }
</script>
