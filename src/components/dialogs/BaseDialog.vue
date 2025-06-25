<template>
  <Transition
    enter-active-class="transition duration-150"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-70 flex items-center justify-center"
      data-testid="base-dialog"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-background/60"
        @click="handleOverlayClick"
        data-testid="dialog-overlay"
      />

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
          :class="maxHeightClass"
          data-testid="dialog-content"
        >
          <!-- Header -->
          <div v-if="title" class="px-6 py-4 border-b border-border" data-testid="dialog-header">
            <h3 class="text-lg font-semibold text-foreground" data-testid="dialog-title">
              {{ title }}
            </h3>
          </div>

          <!-- Content -->
          <div class="px-6 py-4" data-testid="dialog-body">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="px-6 py-4 border-t border-border"
            data-testid="dialog-footer"
          >
            <slot name="footer" />
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    maxHeightClass: {
      type: String,
      default: '',
    },
    closeOnOverlayClick: {
      type: Boolean,
      default: true,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const handleOverlayClick = () => {
    if (props.closeOnOverlayClick) {
      emit('update:modelValue', false)
    }
  }
</script>
