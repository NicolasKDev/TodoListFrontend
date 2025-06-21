<template>
  <Transition
    enter-active-class="transition duration-150"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="modelValue" class="fixed inset-0 z-70 flex items-center justify-center">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-background/60" @click="$emit('update:modelValue', false)" />

      <!-- Dialog -->
      <Transition
        enter-active-class="transition duration-150"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-100"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          v-if="modelValue"
          class="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-4"
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-border">
            <h3 class="text-lg font-semibold text-foreground">
              {{ title }}
            </h3>
          </div>

          <!-- Content -->
          <div class="px-6 py-4">
            <p class="text-muted-foreground">
              {{ message }}
            </p>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-border flex justify-end gap-3">
            <SimpleButton variant="outline" @click="$emit('update:modelValue', false)">
              Cancel
            </SimpleButton>
            <SimpleButton variant="destructive" @click="handleConfirm">
              {{ confirmLabel }}
            </SimpleButton>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
  import SimpleButton from './SimpleButton.vue'

  defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Confirmation',
    },
    message: {
      type: String,
      required: true,
    },
    confirmLabel: {
      type: String,
      default: 'Confirm',
    },
  })

  const emit = defineEmits(['update:modelValue', 'confirm'])

  const handleConfirm = () => {
    emit('confirm')
    emit('update:modelValue', false)
  }
</script>
