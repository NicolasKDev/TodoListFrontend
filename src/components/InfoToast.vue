<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-4 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-4 opacity-0"
  >
    <div
      data-testid="info-toast"
      v-if="toastStore.message"
      class="fixed top-5 left-1/2 -translate-x-1/2 z-100 xl:w-1/5 w-80"
      @click="toastStore.reset"
    >
      <div
        class="flex w-full max-w-sm py-4 px-4 text-card-foreground bg-card rounded-lg border border-border shadow-lg mb-4 transition-all duration-300 hover:shadow-xl"
      >
        <div
          v-if="toastStore.type === 'error'"
          class="flex mr-3 ml-0 my-auto items-center justify-center min-w-8 min-h-8 bg-destructive/10 rounded-full"
        >
          <x-mark-icon class="h-4 w-4 text-destructive" />
        </div>
        <div
          v-else
          class="flex mr-3 ml-0 my-auto items-center justify-center min-w-8 min-h-8 bg-primary/10 rounded-full"
        >
          <check-circle-icon class="h-4 w-4 text-primary" />
        </div>
        <p class="text-sm font-medium pt-0.5 flex-grow">{{ toastStore.message }}</p>
        <div class="ml-2 flex justify-end items-center">
          <icon-button class="hover:bg-accent/10" @click.stop="toastStore.reset">
            <XMarkIcon class="h-5 w-5" />
          </icon-button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  import { useToastStore } from '@/stores/toast'
  import IconButton from './IconButton.vue'
  import { XMarkIcon, CheckCircleIcon } from '@heroicons/vue/24/solid'

  // Access the tasks store to manage toast messages
  const toastStore = useToastStore()
</script>
