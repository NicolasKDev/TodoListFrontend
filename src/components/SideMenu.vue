<template>
  <div>
    <div class="text-foreground fixed top-4 left-4 z-60 flex items-center space-x-2">
      <icon-button @click="isOpen = !isOpen">
        <Bars3Icon class="h-6 w-6" />
      </icon-button>
      <h1 v-if="!isOpen" class="text-lg font-bold">Yet another Todo list</h1>
    </div>

    <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-55" @click="isOpen = false"></div>

    <div
      class="fixed top-0 left-0 h-full w-64 bg-card text-card-foreground shadow-lg transform transition-transform duration-300 z-60 flex flex-col"
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

      <nav class="p-4 space-y-2 flex-1">
        <button
          @click="showLogoutConfirm = true"
          class="w-full text-left px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors flex items-center space-x-2"
        >
          <ArrowRightEndOnRectangleIcon class="h-5 w-5" />
          <span>{{ $t('auth.logout') }}</span>
        </button>
      </nav>

      <!-- Bottom section with Theme Toggle, Language Selector and Terms of Use -->
      <div class="p-4 border-t border-border space-y-2">
        <language-selector />
        <settings-button
          :label="themeStore.theme === 'dark' ? $t('common.light_mode') : $t('common.dark_mode')"
          :title="
            themeStore.theme === 'dark'
              ? $t('common.switch_to_light_mode')
              : $t('common.switch_to_dark_mode')
          "
          @click="themeStore.toggleTheme()"
        >
          <template #icon>
            <SunIcon v-if="themeStore.theme === 'dark'" class="h-4 w-4" />
            <MoonIcon v-else class="h-4 w-4" />
          </template>
        </settings-button>

        <settings-button :label="$t('dialogs.terms_of_use')" @click="showTermsOfUse = true">
          <template #icon>
            <DocumentTextIcon class="h-4 w-4" />
          </template>
        </settings-button>
      </div>
    </div>

    <!-- Logout Confirmation Dialog -->
    <confirm-dialog
      v-model="showLogoutConfirm"
      :title="$t('auth.logout')"
      :message="$t('dialogs.logout_confirm')"
      :confirm-label="$t('dialogs.yes_logout')"
      @confirm="handleLogout"
    />

    <!-- Terms of Use Dialog -->
    <terms-of-use-dialog v-model="showTermsOfUse" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import IconButton from '@/components/IconButton.vue'
  import SettingsButton from '@/components/SettingsButton.vue'
  import LanguageSelector from '@/components/LanguageSelector.vue'
  import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue'
  import TermsOfUseDialog from '@/components/dialogs/TermsOfUseDialog.vue'
  import {
    Bars3Icon,
    XMarkIcon,
    ArrowRightEndOnRectangleIcon,
    DocumentTextIcon,
    SunIcon,
    MoonIcon,
  } from '@heroicons/vue/24/outline'
  import { useThemeStore } from '@/stores/theme'

  const isOpen = ref(false)
  const showLogoutConfirm = ref(false)
  const showTermsOfUse = ref(false)
  const authStore = useAuthStore()
  const themeStore = useThemeStore()

  const handleLogout = () => {
    authStore.logout()
    isOpen.value = false
  }
</script>
