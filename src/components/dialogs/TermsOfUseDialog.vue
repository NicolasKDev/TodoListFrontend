<template>
  <BaseDialog
    v-model="dialogValue"
    title="Terms of Use"
    max-height-class="max-h-[80vh] overflow-y-auto"
  >
    <div class="text-muted-foreground space-y-3">
      <p> This app is a personal demo created for learning and portfolio purposes. </p>

      <ul class="list-disc list-inside space-y-2">
        <li
          >Data is stored on a secured server but is not end-to-end encrypted (except for
          passwords).</li
        >
        <li>Please avoid submitting any personal or sensitive information.</li>
        <li>This app may be modified, reset, or taken offline at any time without notice.</li>
        <li>Use at your own risk.</li>
      </ul>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <SimpleButton @click="handleUnderstand"> I understand </SimpleButton>
      </div>
    </template>
  </BaseDialog>
</template>

<script setup>
  import { computed } from 'vue'
  import BaseDialog from '@/components/dialogs/BaseDialog.vue'
  import SimpleButton from '@/components/SimpleButton.vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const dialogValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })

  const handleUnderstand = () => {
    emit('update:modelValue', false)
  }
</script>
