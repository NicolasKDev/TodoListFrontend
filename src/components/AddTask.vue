<template>
  <form @submit.prevent="tasksStore.createTask" class="flex w-full justify-center my-4">
    <input
      class="w-1/2 px-2 py-1 mr-1 rounded-xl bg-input shadow-md text-foreground"
      type="text"
      placeholder="New Task"
      v-model="tasksStore.newTaskTitle"
      :maxlength="tasksStore.maxTitleLength"
    />
    <simple-button
      class="w-1/7 h-10 lg:flex hidden justify-center items-center"
      data-testid="desktop-button"
      >Add a task</simple-button
    >
    <simple-button
      class="w-1/7 h-10 lg:hidden flex justify-center items-center"
      data-testid="mobile-button"
    >
      <PlusIcon class="h-6 w-6" />
    </simple-button>
  </form>
</template>

<script setup>
  import SimpleButton from '@/components/SimpleButton.vue'
  import { useTasksStore } from '@/stores/tasks'
  import { PlusIcon } from '@heroicons/vue/24/solid'

  // Access the tasks store to manage tasks
  const tasksStore = useTasksStore()
</script>
