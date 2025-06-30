<template>
  <BaseDialog
    v-model="dialogValue"
    :title="$t('dialogs.terms_of_use')"
    max-height-class="max-h-[80vh] overflow-y-auto"
  >
    <div class="text-muted-foreground space-y-3">
      <p>{{ $t('terms_of_use.description') }}</p>

      <ul class="list-disc list-inside space-y-2 text-sm">
        <li>{{ $t('terms_of_use.data_security') }}</li>
        <li>{{ $t('terms_of_use.personal_info') }}</li>
        <li>{{ $t('terms_of_use.modifications') }}</li>
        <li>{{ $t('terms_of_use.use_at_own_risk') }}</li>
      </ul>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <SimpleButton @click="handleUnderstand">{{ $t('dialogs.i_understand') }}</SimpleButton>
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
