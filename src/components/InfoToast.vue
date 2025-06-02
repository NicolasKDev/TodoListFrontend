<template>
  <div
    v-if="toastStore.message"
    class="absolute top-5 left-1/2 -translate-x-1/2 z-100 xl:w-1/5 w-80"
    @click="toastStore.reset"
  >
    <div
      class="flex w-full max-w-sm py-5 px-5 text-popover-foreground bg-popover rounded-xl border border-gray-200 shadow-sm mb-4"
    >
      <div
        v-if="toastStore.type === 'error'"
        class="flex mr-4 ml-0 my-auto items-center justify-center min-w-8 min-h-8 bg-red-400 rounded-full"
      >
        <x-mark-icon class="h-4 w-4 text-white" />
      </div>
      <p class="text-base font-medium pt-0.5">{{ toastStore.message }}</p>
      <div class="ml-auto flex justify-end items-center space-x-3">
        <icon-button @click="toastStore.reset"><XMarkIcon class="h-8 w-8" /></icon-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useToastStore } from '@/stores/toast'
  import IconButton from './IconButton.vue'
  import { XMarkIcon } from '@heroicons/vue/24/solid'

  // Access the tasks store to manage toast messages
  const toastStore = useToastStore()
</script>
