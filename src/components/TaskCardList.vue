<template>
  <draggable
    class="flex flex-col justify-center w-full px-10"
    v-model="tasksStore.tasks"
    item-key="order"
    @end="onDragEnd"
  >
    <template #item="{ element: storeTask, index }">
      <task-card
        :task="storeTask"
        :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50'"
        @update-task="updateTask"
        @delete-task="tasksStore.deleteTask(storeTask)"
      />
    </template>
  </draggable>
</template>

<script setup>
  import { useTasksStore } from '@/stores/tasks'
  import { onMounted } from 'vue'
  import TaskCard from '@/components/TaskCard.vue'
  import draggable from 'vuedraggable'

  const tasksStore = useTasksStore()

  /**
   * When the user drops a task card, this method is called.
   * It updates the order of the tasks from index (index +1) by calling updateOrdersFromIndex
   * then calls patchTask with the task at its new index.
   * The goal is to update the tasks in the backend API.
   * @param {object} event
   */
  const onDragEnd = (event) => {
    const newIndex = event.newIndex
    tasksStore.updateOrdersFromIndex()
    tasksStore.patchTask(tasksStore.tasks[newIndex])
  }

  const updateTask = (taskToUpdate, originalTitle) => {
    const storeTaskId = tasksStore.tasks.findIndex((task) => task.id === taskToUpdate.id)
    if (storeTaskId !== -1) {
      tasksStore.tasks[storeTaskId] = taskToUpdate
      tasksStore.patchTask(taskToUpdate, originalTitle)
    }
  }

  onMounted(async () => {
    await tasksStore.loadTasks()
  })
</script>
