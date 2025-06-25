<template>
  <button
    @click="themeStore.toggleTheme()"
    class="flex text-foreground items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors"
    :title="themeStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <SunIcon v-if="themeStore.theme === 'dark'" class="h-5 w-5" />
    <MoonIcon v-else class="h-5 w-5" />
    <span v-if="!iconOnly" class="text-sm">{{
      themeStore.theme === 'dark' ? 'Light' : 'Dark'
    }}</span>
  </button>
</template>

<script setup>
  import { useThemeStore } from '@/stores/theme'
  import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

  const themeStore = useThemeStore()
</script>
