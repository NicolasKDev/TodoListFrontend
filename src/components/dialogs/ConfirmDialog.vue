<template>
  <BaseDialog v-model="dialogValue" :title="title">
    <p class="text-muted-foreground">
      {{ message }}
    </p>

    <template #footer>
      <div class="flex justify-end gap-3">
        <SimpleButton variant="outline" @click="$emit('update:modelValue', false)">
          {{ $t('common.cancel') }}
        </SimpleButton>
        <SimpleButton variant="destructive" @click="handleConfirm">
          {{ confirmLabel }}
        </SimpleButton>
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

  const dialogValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })

  const handleConfirm = () => {
    emit('confirm')
    emit('update:modelValue', false)
  }
</script>
