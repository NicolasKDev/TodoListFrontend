<template>
  <settings-button
    :label="themeStore.theme === 'dark' ? $t('common.light') : $t('common.dark')"
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
</template>

<script setup>
  import { useThemeStore } from '@/stores/theme'
  import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
  import SettingsButton from '@/components/SettingsButton.vue'

  const themeStore = useThemeStore()
</script>
