<template>
  <div class="space-y-2">
    <h3 class="text-sm font-medium text-muted-foreground">State</h3>
    <div class="space-y-1">
      <label
        class="flex items-center space-x-2 cursor-pointer hover:bg-accent/10 p-2 rounded transition-colors"
      >
        <input
          type="checkbox"
          name="todo"
          value="todo"
          v-model="stateValue"
          class="w-4 h-4 rounded border-input"
          data-testid="todo-checkbox"
        />
        <span class="text-sm">Todo</span>
      </label>
      <label
        class="flex items-center space-x-2 cursor-pointer hover:bg-accent/10 p-2 rounded transition-colors"
      >
        <input
          type="checkbox"
          name="done"
          value="done"
          v-model="stateValue"
          class="w-4 h-4 rounded border-input"
          data-testid="done-checkbox"
        />
        <span class="text-sm">Done</span>
      </label>
    </div>
  </div>
</template>

<script setup>
  import { useFilter } from '@/composables/useFilter'
  const { filterValues: stateValue } = useFilter('state', ['todo', 'done'])
</script>
