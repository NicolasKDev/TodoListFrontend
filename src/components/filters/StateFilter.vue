<template>
  <div class="flex items-center space-x-2 p-2">
    <span class="text-lg font-medium">State</span>
  </div>
  <label class="flex items-center space-x-2 cursor-pointer hover:bg-accent p-2 rounded">
    <input
      type="checkbox"
      name="todo"
      value="todo"
      v-model="stateValue"
      class="w-4 h-4"
      data-testid="todo-checkbox"
    />
    <span>Todo</span>
  </label>
  <label class="flex items-center space-x-2 cursor-pointer hover:bg-accent p-2 rounded">
    <input
      type="checkbox"
      name="done"
      value="done"
      v-model="stateValue"
      class="w-4 h-4"
      data-testid="done-checkbox"
    />
    <span>Done</span>
  </label>
</template>

<script setup>
  import { useFilter } from '@/composables/useFilter'
  const { filterValues: stateValue } = useFilter('state', ['todo', 'done'])
</script>
