<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4 relative">
    <!-- Theme toggle and language selector in top right corner -->
    <div class="absolute top-4 right-4 flex items-center space-x-2">
      <language-selector />
      <theme-toggle />
    </div>

    <!-- Main content -->
    <div class="w-full max-w-md">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import LanguageSelector from '@/components/LanguageSelector.vue'
  import ThemeToggle from '@/components/ThemeToggle.vue'
</script>
