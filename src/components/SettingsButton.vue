<template>
  <button
    @click="$emit('click')"
    class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm text-muted-foreground"
    :title="title"
  >
    <slot name="icon" />
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
  defineProps({
    label: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  })

  defineEmits(['click'])
</script>
